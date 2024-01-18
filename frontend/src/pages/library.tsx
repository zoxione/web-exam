import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AddBook } from '@/components/widgets/add-book';
import { BookCard } from '@/components/widgets/book-card';
import { useWhoamiQuery } from '@/store/services/auth';
import { useGetBooksByLibraryIdQuery } from '@/store/services/books';
import { useGetLibraryByOwnerIdQuery } from '@/store/services/libraries';
import { Link } from 'react-router-dom';

export default function LibraryPage() {
  const { data: user } = useWhoamiQuery();
  const { data: library } = useGetLibraryByOwnerIdQuery(user?.id || 0, { skip: !user?.id });
  const { data: books } = useGetBooksByLibraryIdQuery(library?.id || 0, { skip: !library?.id });

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Библиотека</h3>

      <div className="mt-8 flex flex-row items-center gap-6 rounded-md border p-4">
        <Link to="/profile">
          <Avatar>
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <div>
            <span>Количество полок: </span>
            <Badge variant="secondary">{library?.countShelves}</Badge>
          </div>
          <div>
            <span>Вместимость полок: </span>
            <Badge variant="secondary"> {library?.capacity}</Badge>
          </div>
        </div>
      </div>

      <AddBook />

      <div className="mt-8 flex flex-row gap-4">
        <div className="flex flex-col gap-2 w-full">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Ваши книги</h4>
          {books?.map((book, index) => (
            <BookCard index={index + 1} book={book} key={book.id} />
          ))}
        </div>
      </div>
    </>
  );
}
