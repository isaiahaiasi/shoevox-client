import { zSchemas } from '@isaiahaiasi/voxelatlas-spec';
import React from 'react';

const CURRENT_USER_URL = `${import.meta.env.VITE_API_URL}/auth/current`;
const LOGOUT_URL = `${import.meta.env.VITE_API_URL}/auth/logout`;

const getLoginUrl = (provider: string) => `${import.meta.env.VITE_API_URL}/auth/providers/${provider}`;

const baseFetchOptions: RequestInit = {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
};

export async function loginWithOauth(e: React.UIEvent, provider: string) {
  e.preventDefault();
  window.open(getLoginUrl(provider), '_self');
}

export async function logoutWithOauth(e: UIEvent) {
  e.preventDefault();
  window.open(LOGOUT_URL, '_self');
}

export async function getCurrentUser() {
  const res = await fetch(CURRENT_USER_URL, baseFetchOptions).then((r) => r.json());
  return zSchemas.resources.User.parse(res.user);
}
