import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from './services/tasks';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './services/auth';

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware).concat(authApi.middleware),
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
