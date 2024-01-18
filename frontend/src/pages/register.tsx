import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLazyLoginQuery, useLazyRegisterQuery } from '@/store/services/auth';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [register, { status: registerStatus }] = useLazyRegisterQuery();
  const [login, { status: loginStatus }] = useLazyLoginQuery();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const resRegister = await register({ name, username, password });
    if (resRegister.isSuccess) {
      toast.success('Вы зарегистрировались!');

      const resLogin = await login({ username, password });
      if (resLogin.isSuccess) {
        toast.success('Вы вошли!');
        navigate('/library');
      } else {
        toast.error('Неправильное имя пользователя или пароль');
      }
    } else {
      toast.error('Что-то пошло не так');
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Регистрация</h3>
      <form onSubmit={(e) => handleSubmit(e)} className="max-w-[280px] w-full grid gap-3">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input type="name" id="name" placeholder="ivan" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="username">Имя пользователя</Label>
          <Input
            type="username"
            id="username"
            placeholder="ivan41"
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
        <Button type="submit">Регистрация</Button>
      </form>

      <p className="text-sm leading-none text-center">
        Уже зарегистрированы?{' '}
        <Link to="/login" className="text-primary">
          Авторизация
        </Link>
      </p>
    </div>
  );
}
