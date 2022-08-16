import { operations } from '@isaiahaiasi/voxelatlas-spec';
import { PaginatedOperationId } from '@isaiahaiasi/voxelatlas-spec/public/paginatedOperationId';
import {
  ApiRequest, ApiResponse, MutableOperationId, OperationId, ReadonlyOperationId,
} from '@isaiahaiasi/voxelatlas-spec/public/types';
import {
  useInfiniteQuery, useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query';
import {
  getFetch, getInfiniteFetch,
} from '../utils/fetchUtils';

function getRequestOptions(operationId?: OperationId): RequestInit {
  return {
    credentials: 'include',
    method: operationId ? operations[operationId].method : 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
}

export function getQueryKey(
  operationId: OperationId,
  { params }: Record<string, any>,
): any[] {
  const queryKey = [operationId];

  if (params && Object.keys(params).length > 0) {
    queryKey.push(params);
  }

  return queryKey;
}

export function useInfiniteQueryOperation<T extends PaginatedOperationId>(
  operationId: T,
  reqData: ApiRequest<T>,
) {
  const reqOptions = getRequestOptions();

  return useInfiniteQuery(
    getQueryKey(operationId, reqData),
    getInfiniteFetch(operationId, reqData, reqOptions),
    { getNextPageParam: (lastPage) => lastPage.links.next?.cursor },
  );
}

export function useQueryOperation<T extends ReadonlyOperationId>(
  operationId: T,
  reqData: ApiRequest<T>,
) {
  const reqOptions = getRequestOptions();

  return useQuery(
    getQueryKey(operationId, reqData),
    getFetch(operationId, reqData, reqOptions),
  );
}

export function useMutationOperation<T extends MutableOperationId>(
  operationId: T,
  dependentQueries: any[] = [],
) {
  const queryClient = useQueryClient();

  const reqOptions = getRequestOptions(operationId);

  const mutateFn = (reqData: ApiRequest<T>): Promise<ApiResponse<T>> => {
    reqOptions.body = JSON.stringify(reqData.body);
    const mutationFn = getFetch(operationId, reqData, reqOptions);
    return mutationFn();
  };

  return useMutation(
    mutateFn,
    {
      onSuccess: () => {
        dependentQueries.forEach((query) => {
          queryClient.invalidateQueries(query);
        });
      },
    },
  );
}
