import {
  OperationId, PaginatedOperationId, zSchemas,
} from '@isaiahaiasi/voxelatlas-spec';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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

export function useInfiniteFetch<T extends PaginatedOperationId>(
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

export function useFetch<T extends OperationId>(
  operationId: T,
  reqData: z.infer<typeof zSchemas.requests[T]>,
) {
  const reqOptions = getRequestOptions();

  const queryFn = getFetch(operationId, reqData, reqOptions);

  const urlQueryKey = getUrl(operationId, reqData);

  return useQuery([urlQueryKey], queryFn);
}
