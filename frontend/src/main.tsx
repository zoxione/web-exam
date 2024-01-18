import ReactDOM from 'react-dom/client';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import ErrorPage from './pages/error.tsx';
import RootPage from './pages/root.tsx';
import LoginPage from './pages/login.tsx';
import { Toaster } from 'sonner';
import ProfilePage from './pages/profile.tsx';
import RegisterPage from './pages/register.tsx';
import LibraryPage from './pages/library.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/register',
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/library',
        element: <LibraryPage />,
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
