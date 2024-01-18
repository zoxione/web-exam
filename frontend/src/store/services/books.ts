import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../../types/Book';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL, credentials: 'include' }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooksByLibraryId: builder.query<Book[], number>({
      query: (libraryId) => {
        return {
          url: `books`,
          method: 'GET',
          params: {
            libraryId,
          },
        };
      },
      providesTags: ['Books'],
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation<Book, Book>({
      query: (book) => ({
        url: `/books/${book.id}`,
        method: 'PUT',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation<Book, number>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const { useGetBooksByLibraryIdQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation } =
  booksApi;
