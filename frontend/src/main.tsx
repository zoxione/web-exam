import ReactDOM from 'react-dom/client';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import ErrorPage from './pages/error.tsx';
import RootPage from './pages/root.tsx';
import TasksPage from './pages/tasks.tsx';
import LoginPage from './pages/login.tsx';
import { Toaster } from 'sonner';
import ProfilePage from './pages/profile.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/tasks',
        element: <TasksPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster position="top-center" richColors closeButton />
  </Provider>,
);