import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, IMAGE_URL } from "../../api/config";
import AdminPageContainer from "../../components/wrapper/AdminPageContainer";
import { User } from "../../context/Auth/AuthType";
import { useAuth } from "../../hooks/useAuth";
import LoadingUserDetail from "./LoadingUserDetail";

const UserDetailPage = () => {
  const { user } = useAuth();
  const { userID } = useParams();
  const [userDetail, setUserDetail] = useState<User>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAnUser() {
      try {
        setIsLoading(true);
        if (user?.token) {
          const response = await axios.get(`${API_URL}/users/${userID}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setUserDetail(response.data.user);
        }
      } catch (error) {
        console.log("MY ERROR: ", error);
      }
      setIsLoading(false);
    }

    getAnUser();
    //
  }, []);

  if (isLoading) {
    return (
      <AdminPageContainer>
        <LoadingUserDetail backgroundColor="bg-slate-200" />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      <div className={`w-[350px] md:w-[480px] lg:w-[700px] mx-auto`}>
        <h2 className="mb-10 text-xl font-medium mt-10">User Profile</h2>
        <div className="w-full flex items-center justify-between flex-col md:flex-row p-5 border border-solid border-gray-200 rounded-xl">
          <div className="flex items-center justify-center gap-5 flex-col md:flex-row">
            {userDetail?.photo && (
              <img
                className="bg-slate-100 rounded-full w-24"
                src={`${IMAGE_URL}/img/users/${userDetail.photo}`}
                alt="profile"
              />
            )}
            <div>
              <p className="text-lg text-wording font-medium text-start">
                <span className="text-gray-500 font-normal">Name: </span>{" "}
                {userDetail?.name}
              </p>
              <p className="text-wording">
                <span className="text-gray-500">Email: </span>{" "}
                {userDetail?.email}
              </p>
              <p className="text-wording">
                <span className="text-gray-500">Role: </span> {userDetail?.role}
              </p>
            </div>
          </div>
        </div>

        {userDetail?.address && userDetail.phone && (
          <div className="flex items-center justify-between flex-col md:flex-row p-5 border border-solid border-gray-200 rounded-xl mt-5">
            <div>
              <p className="text-wording">
                <span className="text-gray-500">Address: </span>
                {userDetail.address}
              </p>
              <p className="text-wording">
                <span className="text-gray-500">Phone: </span>
                {userDetail.phone}
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminPageContainer>
  );
};

export default UserDetailPage;
