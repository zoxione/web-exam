import { useDeleteBookMutation, useUpdateBookMutation } from '@/store/services/books';
import { Book } from '@/types/Book';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

interface BookCardProps {
  book: Book;
  index: number;
}

const BookCard = ({ book, index }: BookCardProps) => {
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = () => {
    deleteBook(book.id);
  };

  return (
    <>
      <div className="flex flex-row items-center space-x-4 rounded-md border p-4">
        <span>{index}</span>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">{book.name}</p>
        </div>
        <Button onClick={handleDelete} variant="outline" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export { BookCard };
