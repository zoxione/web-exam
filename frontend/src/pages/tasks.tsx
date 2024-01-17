import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TaskCard } from '@/components/widgets/tast-card';
import { useCreateTaskMutation, useGetTasksQuery } from '@/store/services/tasks';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TasksPage() {
  const { data } = useGetTasksQuery();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [nameTask, setNameTask] = useState('');

  const handleCreateTask = () => {
    createTask({ name: nameTask });
  };

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Задачи</h3>

      <Button>
        <Link to="/profile">Профиль</Link>
      </Button>

      <div className="my-6">
        <Label htmlFor="name">Добавить задачу</Label>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="name" placeholder="Название" value={nameTask} onChange={(e) => setNameTask(e.target.value)} />
          <Button onClick={handleCreateTask}>Добавить</Button>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 w-full">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Запланированные</h4>
          {data?.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Выполненные</h4>
          {data?.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>
      </div>
    </>
  );
}
