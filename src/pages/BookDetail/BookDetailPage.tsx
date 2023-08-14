import BookDetailAdmin from "../../components/book/BookDetailAdmin";
import BookDetailUser from "../../components/book/BookDetailUser";
import { UserRole } from "../../context/Auth/AuthType";
import { useAuth } from "../../hooks/useAuth";

const BookDetailPage = () => {
  const { user } = useAuth();

  if (user?.role === UserRole.Admin) {
    return <BookDetailAdmin />;
  }

  return (
    <div className="pt-14">
      <BookDetailUser />;
    </div>
  );
};

export default BookDetailPage;
