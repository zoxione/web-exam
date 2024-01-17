import { Button } from '@/components/ui/button';
import { useLazyLogoutQuery, useWhoamiQuery } from '@/store/services/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data } = useWhoamiQuery();
  const [logout, { status }] = useLazyLogoutQuery();

  const handleLogout = async () => {
    const res = await logout();

    if (res.isSuccess) {
      toast.success('Вы вышли!');
      navigate(0);
    } else {
      toast.error('Что-то пошло не так');
    }
  };

  return (
    <div className="">
      <p>{data?.name}</p>
      <p>{data?.username}</p>
      <Button onClick={handleLogout}>Выйти</Button>
    </div>
  );
}
