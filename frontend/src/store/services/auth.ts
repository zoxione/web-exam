import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../../types/User';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL, credentials: 'include' }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.query<User, { username: string; password: string }>({
      query: (args) => {
        return {
          url: '/auth/login',
          method: 'POST',
          body: args,
        };
      },
      providesTags: ['Auth'],
    }),
    whoami: builder.query<User, void>({
      query: () => `auth/whoami`,
      providesTags: ['Auth'],
    }),
    logout: builder.query<User, void>({
      query: () => `auth/logout`,
      providesTags: ['Auth'],
    }),
    register: builder.query<User, { username: string; password: string; name: string }>({
      query: (args) => {
        return {
          url: '/auth/register',
          method: 'POST',
          body: args,
        };
      },
      providesTags: ['Auth'],
    }),
  }),
});

export const { useWhoamiQuery, useLazyLoginQuery, useLazyWhoamiQuery, useLazyLogoutQuery, useLazyRegisterQuery } =
  authApi;
