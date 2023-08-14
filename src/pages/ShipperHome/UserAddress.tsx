import { IMAGE_URL } from "../../api/config";
import { User } from "../../context/Auth/AuthType";

type UserAddressProps = {
  user?: User;
};

const UserAddress = ({ user }: UserAddressProps) => {
  if (!user) {
    return <></>;
  }

  return (
    <div className="w-[300px] md:w-[600px] mx-auto border border-solid border-gray-300 rounded-md p-5 mb-10">
      <div className="flex md:flex-row flex-col items-center md:items-start justify-between gap-2">
        <img
          src={`${IMAGE_URL}/img/users/${user.photo}`}
          alt="user photo"
          className="w-32 rounded-sm"
        />

        <div className="w-full md:w-[60%] md:mt-0 mt-4 flex flex-col gap-2">
          <h2>
            <span className="text-base text-gray-500">Owner Name: </span>
            {user.name}
          </h2>
          <p>
            <span className="text-base text-gray-500">Owner Address: </span>{" "}
            {user.address}
          </p>
          <p>
            <span className="text-base text-gray-500">Owner Phone: </span>{" "}
            {user.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
