import { OperationId, PaginatedOperationId, zSchemas } from '@isaiahaiasi/voxelatlas-spec';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { z } from 'zod';
import { AuthContext, User } from '../components/AuthProvider';
import { getInfiniteFetch, getFetch, getUrl } from '../utils/fetchUtils';

interface AuthHeaders {
  authorization: `Bearer ${string}`;
  'X-Oauth-Provider': string;
}

function getRequestOptions(user: User | null): RequestInit {
  const authHeaders: AuthHeaders | {} = user ? {
    authorization: `Bearer ${user.token}`,
    'X-OAuth-Provider': user.provider,
  } : {};

  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeaders,
    },
  };
}

export function useInfiniteFetch<T extends PaginatedOperationId>(
  operationId: T,
  reqData: z.infer<typeof zSchemas.requests[T]>,
) {
  const [user] = useContext(AuthContext);

  const reqOptions = getRequestOptions(user);

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
  const [user] = useContext(AuthContext);

  const reqOptions = getRequestOptions(user);

  const queryFn = getFetch(operationId, reqData, reqOptions);

  const urlQueryKey = getUrl(operationId, reqData);

  return useQuery([urlQueryKey], queryFn);
}
