import {
  OperationId, operations, zSchemas,
} from '@isaiahaiasi/voxelatlas-spec';
import { QueryFunction } from 'react-query';
import { z } from 'zod';

type GenericRequestData = {
  params?: Record<string, any>;
  query?: Record<string, any>;
};

const { responses, requests } = zSchemas;

const DEFAULT_LIMIT = 5;

function interpolateParams(path: string, params?: Record<string, string>) {
  if (!params) return path;

  return path.replace(/\{.*?\}/g, (param) => {
    const paramName = param.slice(1, -1);
    return encodeURIComponent(params[paramName]);
  });
}

function getQueryString(query?: Record<string, any>) {
  let queryString = '?';
  if (query) {
    queryString += Object.entries(query)
      .filter(([, v]) => v != null)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
  }

  // avoid sending just '?' if given empty query object
  return queryString !== '?' ? queryString : '';
}

export function getUrl<T extends OperationId>(
  operationId: T,
  { query, params }: GenericRequestData,
) {
  const queryString = getQueryString(query);

  const path = interpolateParams(operations[operationId].path, params);

  return import.meta.env.VITE_API_URL + path + queryString;
}

export function getQuery<OpId extends OperationId>(
  operationId: OpId,
  reqData: z.infer<typeof requests[OpId]>,
  reqOptions?: RequestInit,
) {
  // I immediately cast because I can't use the *intersection* of the generic type.
  // However, being able to infer the precise type requestData should be
  // when I'm passing in arguments is very useful,
  // so I *do* include the generic typing for requestData in the signature.
  const { query, params } = reqData as GenericRequestData;

  const url = getUrl(operationId, { query, params });

  type QueryData = z.infer<typeof responses[OpId]>;

  const queryFn: QueryFunction<QueryData, OpId> = () => fetch(url, reqOptions)
    .then((res) => res.json())
    .then((res) => responses[operationId].parse(res));

  return queryFn;
}

export function getPaginatedQuery<OpId extends OperationId>(
  operationId: OpId,
  reqData: z.infer<typeof requests[OpId]>,
  requestInit?: RequestInit,
) {
  const { query, params } = reqData as GenericRequestData;

  type QueryResponseData = z.infer<typeof responses[OpId]>;

  const queryFn: QueryFunction<QueryResponseData, OpId> = async ({ pageParam }) => {
    const cursor = pageParam;
    const paginatedQueryParams = {
      limit: DEFAULT_LIMIT,
      ...query,
      cursor,
    };
    const url = getUrl(operationId, { params, query: paginatedQueryParams });

    // I might need to "deep merge" local request options & `requestInit` param
    // in order to prevent sub-options from being overwritten.
    const { method } = operations[operationId];

    return fetch(url, { method, ...requestInit })
      .then((result) => result.json())
      .then((result) => responses[operationId].parse(result));
  };

  return queryFn;
}
