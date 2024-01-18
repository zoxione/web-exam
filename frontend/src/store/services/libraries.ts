import { Library } from '@/types/Library';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const librariesApi = createApi({
  reducerPath: 'librariesApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL, credentials: 'include' }),
  tagTypes: ['Libraries'],
  endpoints: (builder) => ({
    getLibraryByOwnerId: builder.query<Library, number>({
      query: (id) => `libraries/${id}`,
      providesTags: ['Libraries'],
    }),
    updateLibrary: builder.mutation<Library, Library>({
      query: (library) => ({
        url: `/libraries/${library.id}`,
        method: 'PUT',
        body: library,
      }),
      invalidatesTags: ['Libraries'],
    }),
  }),
});

export const { useGetLibraryByOwnerIdQuery, useUpdateLibraryMutation } = librariesApi;
