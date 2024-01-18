import { configureStore } from '@reduxjs/toolkit';
import { booksApi } from './services/books';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './services/auth';
import { librariesApi } from './services/libraries';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [librariesApi.reducerPath]: librariesApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(librariesApi.middleware).concat(booksApi.middleware),
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
