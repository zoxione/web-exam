import { Task } from '@/types/Task';
import { Checkbox } from '../ui/checkbox';
import { FormEvent } from 'react';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/store/services/tasks';
import { Button } from '../ui/button';
import { TrashIcon } from '@radix-ui/react-icons';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleComplete = (e: FormEvent<HTMLButtonElement>) => {
    if (task.completed) {
      return;
    }
    updateTask({ ...task, completed: true });
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <>
      <div className="flex flex-row items-center space-x-4 rounded-md border p-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">{task.name}</p>
          <p className="text-sm text-muted-foreground">{task.userId}</p>
        </div>
        <Checkbox onClick={(e) => handleComplete(e)} checked={task.completed} disabled={task.completed} />
        <Button onClick={handleDelete} variant="outline" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export { TaskCard };
