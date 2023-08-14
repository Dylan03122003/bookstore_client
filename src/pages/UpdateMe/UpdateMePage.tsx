import AdminPageContainer from "../../components/wrapper/AdminPageContainer";
import { UserRole } from "../../context/Auth/AuthType";
import { useAuth } from "../../hooks/useAuth";
import UpdateMeForm from "./UpdateMeForm";

const UpdateMePage = () => {
  const { user } = useAuth();

  if (user?.role === UserRole.Admin) {
    return (
      <AdminPageContainer>
        <UpdateMeForm />
      </AdminPageContainer>
    );
  }

  return (
    <div className="p-5">
      <UpdateMeForm />
    </div>
  );
};

export default UpdateMePage;
