import {
  OperationId, operations, zSchemas,
} from '@isaiahaiasi/voxelatlas-spec';
import { QueryFunction } from '@tanstack/react-query';
import { z } from 'zod';

type GenericRequestData = {
  params?: Record<string, any>;
  query?: Record<string, any>;
  body?: Record<string, any>;
};

const { responses, requests } = zSchemas;

export const BASE_FETCH_OPTIONS: RequestInit = {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
};

export const DEFAULT_LIMIT = 5;

export const CURRENT_USER_URL = `${import.meta.env.VITE_API_URL}/auth/current`;
export const LOGOUT_URL = `${import.meta.env.VITE_API_URL}/auth/logout`;

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

export function getLoginUrl(provider: string) {
  return `${import.meta.env.VITE_API_URL}/auth/providers/${provider}`;
}

export async function getCurrentUser() {
  const { user } = await fetch(CURRENT_USER_URL, BASE_FETCH_OPTIONS).then((r) => r.json());
  return user ? zSchemas.resources.User.parse(user) : null;
}

export function getUrl<T extends OperationId>(
  operationId: T,
  { query, params }: GenericRequestData,
) {
  const queryString = getQueryString(query);

  const path = interpolateParams(operations[operationId].path, params);

  return import.meta.env.VITE_API_URL + path + queryString;
}

export function getFetch<OpId extends OperationId>(
  operationId: OpId,
  reqData: z.infer<typeof requests[OpId]>,
  requestInit?: RequestInit,
) {
  // I immediately cast because I can't use the *intersection* of the generic type.
  // However, being able to infer the precise type requestData should be
  // when I'm passing in arguments is very useful,
  // so I *do* include the generic typing for requestData in the signature.
  const { query, params } = reqData as GenericRequestData;

  const url = getUrl(operationId, { query, params });

  type QueryData = z.infer<typeof responses[OpId]>;

  const queryFn: QueryFunction<QueryData> = () => fetch(url, requestInit)
    .then((res) => res.json())
    .then((res) => responses[operationId].parse(res));

  return queryFn;
}

export function getInfiniteFetch<OpId extends OperationId>(
  operationId: OpId,
  reqData: z.infer<typeof requests[OpId]>,
  requestInit?: RequestInit,
) {
  const { query, params } = reqData as GenericRequestData;

  type QueryResponseData = z.infer<typeof responses[OpId]>;

  const queryFn: QueryFunction<QueryResponseData> = async ({ pageParam }) => {
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
