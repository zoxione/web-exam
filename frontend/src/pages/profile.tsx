import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLazyLogoutQuery, useWhoamiQuery } from '@/store/services/auth';
import { useGetLibraryByOwnerIdQuery, useUpdateLibraryMutation } from '@/store/services/libraries';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ProfilePage() {
  const navigate = useNavigate();

  const { data: user } = useWhoamiQuery();
  const [logout, { status }] = useLazyLogoutQuery();
  const { data: library } = useGetLibraryByOwnerIdQuery(user?.id || 0, { skip: !user?.id });
  const [updateLibrary] = useUpdateLibraryMutation();

  const [countShelves, setCountShelves] = useState(library?.countShelves || 0);
  const [capacity, setCapacity] = useState(library?.capacity || 0);
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');

  const handleLogout = async () => {
    const res = await logout();

    if (res.isSuccess) {
      toast.success('Вы вышли!');
      navigate(0);
    } else {
      toast.error('Что-то пошло не так');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (library?.id) {
      const res: any = await updateLibrary({ ...library, countShelves: countShelves, capacity: capacity });
      if (res.error?.status === 400) {
        toast.error('Нет места в библиотеке');
      }
      if (res.data) {
        toast.success('Данные обновлены');
      }
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-8">
      <form onSubmit={(e) => handleSubmit(e)} className="max-w-[280px] w-full grid gap-3">
        <Link to="/library" className="absolute">
          <Button variant="outline" size="icon">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <h3 className="grow  scroll-m-20 text-2xl font-semibold tracking-tight text-center">Профиль</h3>

        <div className="mt-4">
          <Label htmlFor="name">Имя</Label>
          <Input
            type="text"
            id="name"
            placeholder="ivan"
            disabled
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="username">Имя пользователя</Label>
          <Input
            type="text"
            id="username"
            placeholder="ivan14"
            disabled
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="countShelves">Количество полок</Label>
          <Input
            type="number"
            id="countShelves"
            value={countShelves}
            onChange={(e) => setCountShelves(e.target.valueAsNumber)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="capacity">Вместимость</Label>
          <Input type="number" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.valueAsNumber)} />
        </div>

        <Button type="submit">Сохранить</Button>
        <Button type="button" variant="destructive" onClick={handleLogout}>
          Выйти
        </Button>
      </form>
    </div>
  );
}
