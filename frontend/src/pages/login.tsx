import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLazyLoginQuery } from '@/store/services/auth';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [login, { status }] = useLazyLoginQuery();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await login({ username, password });
    if (res.isSuccess) {
      toast.success('Вы вошли!');
      navigate('/library');
    } else {
      toast.error('Неправильное имя пользователя или пароль');
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Авторизация</h3>
      <form onSubmit={(e) => handleSubmit(e)} className="max-w-[280px] w-full grid gap-3">
        <div>
          <Label htmlFor="username">Имя пользователя</Label>
          <Input
            type="username"
            id="username"
            placeholder="ivan"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="">
          <Label htmlFor="password">Пароль</Label>
          <Input
            type="password"
            id="password"
            placeholder="123123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Войти</Button>
      </form>

      <p className="text-sm leading-none text-center">
        Нет аккаунта?{' '}
        <Link to="/register" className="text-primary">
          Регистрация
        </Link>
      </p>
    </div>
  );
}
