import { Task } from '@/types/Task';
import { Checkbox } from '../ui/checkbox';
import { FormEvent } from 'react';
import { useUpdateTaskMutation } from '@/store/services/tasks';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const handleComplete = (e: FormEvent<HTMLButtonElement>) => {
    if (task.completed) {
      return;
    }

    updateTask({ ...task, completed: true });
  };

  return (
    <>
      <div className="flex flex-row items-center space-x-4 rounded-md border p-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">{task.name}</p>
          <p className="text-sm text-muted-foreground">{task.userId}</p>
        </div>
        <Checkbox onClick={(e) => handleComplete(e)} checked={task.completed} disabled={task.completed} />
      </div>
    </>
  );
};

export { TaskCard };
