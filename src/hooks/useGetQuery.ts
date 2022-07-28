import { OperationId, PaginatedOperationId, zSchemas } from '@isaiahaiasi/voxelatlas-spec';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { z } from 'zod';
import { AuthContext } from '../components/AuthProvider';
import { getPaginatedQuery, getQuery, getUrl } from '../utils/queries';

interface AuthHeaders {
  authorization: `Bearer ${string}`;
  'X-Oauth-Provider': string;
}

function useGetRequestOptions(): RequestInit {
  const [user] = useContext(AuthContext);

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

export function useGetPaginatedQuery<T extends PaginatedOperationId>(
  operationId: T,
  reqData: z.infer<typeof zSchemas.requests[T]>,
) {
  const reqOptions = useGetRequestOptions();

  const queryFn = getPaginatedQuery(operationId, reqData, reqOptions);

  const initialUrlQueryKey = getUrl(operationId, reqData);

  return useInfiniteQuery(
    [initialUrlQueryKey],
    queryFn,
    { getNextPageParam: (lastPage) => lastPage.links.next?.cursor },
  );
}

export function useGetQuery<T extends OperationId>(
  operationId: T,
  reqData: z.infer<typeof zSchemas.requests[T]>,
) {
  const reqOptions = useGetRequestOptions();

  const queryFn = getQuery(operationId, reqData, reqOptions);

  const urlQueryKey = getUrl(operationId, reqData);

  return useQuery([urlQueryKey], queryFn);
}
