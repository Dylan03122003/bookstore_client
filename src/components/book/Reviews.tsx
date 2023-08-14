import { IMAGE_URL } from "../../api/config";
import { UserRole } from "../../context/Auth/AuthType";
import { Review } from "../../context/Book/BookType";
import { useAuth } from "../../hooks/useAuth";
import AverageRating from "../rating/AverageRating";

type ReviewProps = {
  reviews: Review[];
};

const Reviews = ({ reviews }: ReviewProps) => {
  const { user } = useAuth();

  const noReviewMessage =
    user?.role === UserRole.Admin
      ? "There is no review."
      : "There is no review. Add new one!";

  if (reviews.length <= 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-5">User Reviews</h2>
        <p className="text-gray-600">{noReviewMessage}</p>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">User Reviews</h2>
      {reviews.map((item) => (
        <div
          className="border border-solid border-gray-300 p-2 mb-2 rounded-md"
          key={item._id}
        >
          <div className="flex items-center gap-4">
            <img
              className="w-16 rounded-full"
              src={`${IMAGE_URL}/img/users/${item.user.photo}`}
              alt="user-photo"
            />

            <div>
              <h2 className="mb-2 text-wording font-medium">
                {item.user.name}
              </h2>
              <AverageRating avgRating={item.rating} />
            </div>
          </div>

          <p className="mt-5 text-gray-600">{item.review}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
