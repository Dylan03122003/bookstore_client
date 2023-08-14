import { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};

const AdminPageContainer = ({ children }: WrapperProps) => {
  return (
    <div className="bg-admin-page overflow-auto w-full p-0 sm:p-5 h-full">
      {children}
    </div>
  );
};

export default AdminPageContainer;
