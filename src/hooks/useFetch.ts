import { operations } from '@isaiahaiasi/voxelatlas-spec';
import { PaginatedOperationId } from '@isaiahaiasi/voxelatlas-spec/public/paginatedOperationId';
import {
  ApiRequest, ApiResponse, MutableOperationId, OperationId, ReadonlyOperationId,
} from '@isaiahaiasi/voxelatlas-spec/public/types';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
  getFetch, getInfiniteFetch, getUrl,
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

export function useInfiniteQueryOperation<T extends PaginatedOperationId>(
  operationId: T,
  reqData: ApiRequest<T>,
) {
  const reqOptions = getRequestOptions();

  const queryFn = getInfiniteFetch(operationId, reqData, reqOptions);

  const initialUrlQueryKey = getUrl(operationId, reqData);

  return useInfiniteQuery(
    [initialUrlQueryKey],
    queryFn,
    { getNextPageParam: (lastPage) => lastPage.links.next?.cursor },
  );
}

export function useQueryOperation<T extends ReadonlyOperationId>(
  operationId: T,
  reqData: ApiRequest<T>,
) {
  const reqOptions = getRequestOptions();

  const queryFn = getFetch(operationId, reqData, reqOptions);

  const urlQueryKey = getUrl(operationId, reqData);

  return useQuery([urlQueryKey], queryFn);
}

export function useMutationOperation<T extends MutableOperationId>(
  operationId: T,
) {
  const reqOptions = getRequestOptions(operationId);

  const mutateFn = (reqData: ApiRequest<T>): Promise<ApiResponse<T>> => {
    reqOptions.body = JSON.stringify(reqData.body);
    const mutationFn = getFetch(operationId, reqData, reqOptions);
    return mutationFn();
  };

  return useMutation(mutateFn);
}
