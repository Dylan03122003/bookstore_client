import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../api/config";
import { User, UserRole } from "../../context/Auth/AuthType";
import { defaultImgURL } from "../../data/dummy-data";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

type DropdownProfileProps = {
  user: User;
  backgroundColor?: string;
  dropAtRight?: boolean;
  borderColor?: string;
};

const UserProfile = ({
  user,
  backgroundColor,
  dropAtRight = false,
  borderColor = "border-white-custom",
}: DropdownProfileProps) => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setShowProfile(false);
    }
  };

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    clearCart();
    navigate("/log-in");
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        onClick={() => {
          setShowProfile((prevShow) => !prevShow);
        }}
        className="flex items-center gap-2 cursor-pointer border-2 border-solid border-slate-400 rounded-full"
      >
        <div className="border border-solid border-white-custom rounded-full">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={`${IMAGE_URL}/img/users/${user.photo}`}
            alt="user image"
          />
        </div>
      </div>

      {showProfile && (
        <div
          className={`absolute top-16 ${
            dropAtRight ? "-right-56" : "-left-56"
          }  w-64 ${
            backgroundColor ? backgroundColor : "bg-primary"
          }  border border-solid ${borderColor}  rounded-md`}
          ref={profileRef}
        >
          <div className="flex items-center justify-start gap-4 p-4 border-b-[1px] border-solid border-white-custom">
            <div className="relative">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={`${IMAGE_URL}/img/users/${user.photo}`}
                alt="user image"
              />
              <div className="absolute -bottom-1 right-0 bg-green-400 w-4 h-4 rounded-full border border-solid border-white"></div>
            </div>

            <div>
              <p className="text-lg font-medium text-secondary max-w-[150px] ">
                {user.name}
              </p>
              <p className="text-wording max-w-[150px] overflow-x-scroll scrollbar-hide">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center gap-5  p-4">
            <Link className="text-wording" to="/profile">
              View profile
            </Link>
            {user.role === UserRole.User && (
              <Link className="text-wording" to="/my-order">
                My order
              </Link>
            )}
            <button onClick={handleLogout}>Log out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
