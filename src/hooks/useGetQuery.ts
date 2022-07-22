import { OperationId } from '@isaiahaiasi/voxelatlas-spec';
import { requests } from '@isaiahaiasi/voxelatlas-spec/public/zSchemas';
import { useContext } from 'react';
import { z } from 'zod';
import { AuthContext } from '../components/AuthProvider';
import { getPaginatedQuery, getQuery } from '../utils/queries';

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

export function useGetPaginatedQuery<T extends OperationId>(
  operationId: T,
  reqData: z.infer<typeof requests[T]>,
) {
  const reqOptions = useGetRequestOptions();
  return getPaginatedQuery(operationId, reqData, reqOptions);
}

export function useGetQuery<T extends OperationId>(
  operationId: T,
  reqData: z.infer<typeof requests[T]>,
) {
  const reqOptions = useGetRequestOptions();
  return getQuery(operationId, reqData, reqOptions);
}
