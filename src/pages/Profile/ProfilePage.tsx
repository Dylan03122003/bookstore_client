import AdminPageContainer from "../../components/wrapper/AdminPageContainer";
import { UserRole } from "../../context/Auth/AuthType";
import { useAuth } from "../../hooks/useAuth";
import Profile from "./Profile";

const ProfilePage = () => {
  const { user } = useAuth();

  if (user?.role === UserRole.Admin) {
    return (
      <AdminPageContainer>
        <Profile user={user} />
      </AdminPageContainer>
    );
  }

  return (
    <div className="p-5">
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
