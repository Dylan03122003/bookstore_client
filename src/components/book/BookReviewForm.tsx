import axios from "axios";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Button, Divider, TextArea } from "..";
import { API_URL } from "../../api/config";
import { Review, UserReview } from "../../context/Book/BookType";
import { useAuth } from "../../hooks/useAuth";

type BookReviewFormProps = {
  onSubmit: (newReview: Review) => void;
  bookID: string;
};
const defaultRatingStars = [
  {
    rating: 1,
    isRated: false,
  },
  {
    rating: 2,
    isRated: false,
  },
  {
    rating: 3,
    isRated: false,
  },
  {
    rating: 4,
    isRated: false,
  },
  {
    rating: 5,
    isRated: false,
  },
];
const BookReviewForm = ({ bookID, onSubmit }: BookReviewFormProps) => {
  const [ratingStars, setRatingStars] = useState(defaultRatingStars);
  const [review, setReview] = useState<string | undefined>(undefined);
  const [rating, setRating] = useState<number>();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  function handleRating(rating: number) {
    //
    setRatingStars((prevState) => {
      return prevState.map((star) => {
        if (star.rating <= rating) {
          return { ...star, isRated: true };
        } else {
          return { ...star, isRated: false };
        }
      });
    });

    setRating(rating);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/reviews`,
        { review, rating, book: bookID, user: user?.userID },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const userReview: UserReview = {
        _id: response.data.review.user,
        name: user?.name || "",
        photo: user?.photo || "",
      };
      const newReview: Review = {
        ...response.data.review,
        user: userReview,
      };
      onSubmit(newReview);
      setReview(undefined);
      setRatingStars(defaultRatingStars);
    } catch (error) {
      console.log("MY ERROR: ", error);
    }
    setIsLoading(false);
  }

  if (!user) {
    return <></>;
  }

  return (
    <form className="mt-10" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-base">Give your raing</h2>
      <div className="flex items-center justify-start gap-2">
        {ratingStars.map((star) => (
          <button
            type="button"
            onClick={() => handleRating(star.rating)}
            key={star.rating}
          >
            <AiFillStar
              className={`w-10 h-10 ${
                star.isRated ? "text-star" : "text-gray-500"
              }`}
            />
          </button>
        ))}
      </div>
      <Divider />
      <TextArea
        label="Enter review"
        placeholder="Your review..."
        onChange={(e) => setReview(e.target.value)}
        backgroundColor="bg-white"
        className="my-4"
        value={review}
        refresh={true}
        marginX="mx-0"
        width="w-full"
      />
      <Button
        disabled={review === "" || review === undefined || !rating}
        type="submit"
        onClick={() => {
          //
        }}
        backgroundColor="bg-blue-500"
        textColor="text-white"
      >
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default BookReviewForm;
