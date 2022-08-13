import {
  OperationId, PaginatedOperationId, zSchemas,
} from '@isaiahaiasi/voxelatlas-spec';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { getInfiniteFetch, getFetch, getUrl } from '../utils/fetchUtils';

function getRequestOptions(): RequestInit {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
}

export function useInfiniteQueryOperation<T extends PaginatedOperationId>(
  operationId: T,
  reqData: z.infer<typeof zSchemas.requests[T]>,
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

export function useQueryOperation<T extends OperationId>(
  operationId: T,
  reqData: z.infer<typeof zSchemas.requests[T]>,
) {
  const reqOptions = getRequestOptions();

  const queryFn = getFetch(operationId, reqData, reqOptions);

  const urlQueryKey = getUrl(operationId, reqData);

  return useQuery([urlQueryKey], queryFn);
}

export function useMutationOperation<T extends OperationId>(
  operationId: T,
) {
  const reqOptions = getRequestOptions();

  type ZResponse = z.infer<typeof zSchemas.responses[T]>;
  type ZRequest = z.infer<typeof zSchemas.requests[T]>;

  return useMutation(
    (reqData: ZRequest): Promise<ZResponse> => {
      const mutationFn = getFetch(operationId, reqData, reqOptions);
      return mutationFn();
    },
  );
}
