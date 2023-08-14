import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../api/config";
import { User, UserRole } from "../../context/Auth/AuthType";

type ProfileProps = {
  user: User | null;
};

const Profile = ({ user }: ProfileProps) => {
  const isUserProfile = user?.role === UserRole.User;
  return (
    <div
      className={`w-[350px] ${
        isUserProfile
          ? "md:w-[600px] lg:w-[1000px]"
          : "md:w-[480px] lg:w-[700px]"
      } mx-auto`}
    >
      <h2 className="mb-10 text-xl font-medium">My Profile</h2>
      <div className="flex items-center justify-between flex-col md:flex-row p-5 border border-solid border-gray-200 rounded-xl">
        <div className="flex items-center justify-center gap-5 flex-col md:flex-row">
          <img
            className="bg-slate-100 rounded-full w-24"
            src={`${IMAGE_URL}/img/users/${user?.photo}`}
            alt="profile"
          />
          <div>
            <p className="text-lg text-wording font-medium text-center md:text-start">
              {user?.name}
            </p>
            <p className="">{user?.email}</p>
          </div>
        </div>

        <Link
          to="update-me"
          className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-solid border-gray-200 w-full md:w-fit mt-5 md:mt-0"
        >
          <span className="text-gray-600">Edit</span>
          <BiEditAlt className="text-gray-500 text-lg" />
        </Link>
      </div>

      {user?.address && user.phone && (
        <div className="flex items-center justify-between flex-col md:flex-row p-5 border border-solid border-gray-200 rounded-xl mt-5">
          <div>
            <p className="text-wording">
              <span className="text-gray-500">Address: </span>
              {user.address}
            </p>
            <p className="text-wording">
              <span className="text-gray-500">Phone: </span>
              {user.phone}
            </p>
          </div>

          {/* <Link
            to="update-me"
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-solid border-gray-200 w-full md:w-fit mt-5 md:mt-0"
          >
            <span className="text-gray-600">Edit</span>
            <BiEditAlt className="text-gray-500 text-lg" />
          </Link> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
