import { useCreateBookMutation } from '@/store/services/books';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

const AddBook = () => {
  const [createBook, { isLoading }] = useCreateBookMutation();

  const [nameBook, setNameBook] = useState('');

  const handleCreateBook = async () => {
    const res: any = await createBook({ name: nameBook });
    if (res.error?.status === 400) {
      toast.error('Нет места в библиотеке');
    }
    if (res.data) {
      toast.success('Книга добавлена');
    }
  };

  return (
    <div className="my-6 w-full">
      <Label htmlFor="name">Добавить книгу</Label>
      <div className="flex w-full items-center space-x-2">
        <Input type="name" placeholder="Название" value={nameBook} onChange={(e) => setNameBook(e.target.value)} />
        <Button onClick={handleCreateBook}>Добавить</Button>
      </div>
    </div>
  );
};

export { AddBook };
