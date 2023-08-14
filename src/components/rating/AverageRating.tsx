import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type AverageRatingProps = {
  avgRating: number;
};

const AverageRating = ({ avgRating }: AverageRatingProps) => {
  const fullStars = Math.floor(avgRating); // Number of full stars
  const hasHalfStar = avgRating % 1 !== 0; // Check if there is a half star

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <AiFillStar key={index} className="text-star" />
      ))}

      {/* Half star */}
      {hasHalfStar && <AiFillStar className="text-star" />}

      {/* Empty stars */}
      {[...Array(5 - Math.ceil(avgRating))].map((_, index) => (
        <AiOutlineStar key={index} className="text-gray-300" />
      ))}
    </div>
  );
};

export default AverageRating;
