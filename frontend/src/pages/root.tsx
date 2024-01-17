import { useLazyWhoamiQuery } from '@/store/services/auth';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function RootPage() {
  const navigate = useNavigate();
  const [whoami, { status }] = useLazyWhoamiQuery();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await whoami();
      if (res.status === 'fulfilled') {
        // navigate('/tasks');
      } else if (res.status === 'rejected') {
        navigate('/login');
      }
    };
    checkAuth().catch(console.error);
  }, []);

  return (
    <div className="h-full max-w-4xl mx-auto p-4">
      {status === 'pending' ? (
        <div className="h-full flex justify-center items-center gap-4">
          <ReloadIcon className="h-16 w-16 animate-spin" />
          <span className="text-2xl font-bold">Загружаюсь...</span>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
