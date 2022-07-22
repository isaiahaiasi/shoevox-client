import { OperationId, operations, zSchemas } from '@isaiahaiasi/voxelatlas-spec';
import { QueryFunction } from 'react-query';
import { z } from 'zod';

const { responses } = zSchemas;

const GLOBAL_LIMIT = 5;

export function getPaginatedQuery<OpId extends OperationId>(operationId: OpId) {
  type QueryData = z.infer<typeof responses[typeof operationId]>;

  const endpoint = import.meta.env.VITE_API_URL + operations[operationId].path;

  const queryFn: QueryFunction<QueryData, OpId> = ({ pageParam }) => {
    const cursorQuery = pageParam ? `&cursor=${pageParam}` : '';
    const url = `${endpoint}?limit=${GLOBAL_LIMIT}${cursorQuery}`;

    return fetch(url)
      .then((result) => result.json())
      .then((result) => responses[operationId].parse(result));
  };

  return queryFn;
}

export function getQuery<OpId extends OperationId>(operationId: OpId) {
  type QueryData = z.infer<typeof responses[typeof operationId]>;

  const endpoint = import.meta.env.VITE_API_URL + operations[operationId].path;

  const queryFn: QueryFunction<QueryData, OpId> = () => fetch(endpoint)
    .then((res) => res.json())
    .then((res) => responses[operationId].parse(res));

  return queryFn;
}
