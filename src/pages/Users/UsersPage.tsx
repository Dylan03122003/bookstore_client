import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../api/config";
import AdminPageContainer from "../../components/wrapper/AdminPageContainer";
import { useAuth } from "../../hooks/useAuth";
const UsersPage = () => {
  const navigate = useNavigate();
  const { loadAllUsers, allUsers } = useAuth();

  useEffect(() => {
    loadAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToDetailPage(userID: string) {
    navigate(`/users/${userID}`);
  }

  return (
    <AdminPageContainer>
      <div className="sm:p-0 p-5">
        <div className="w-[1300px] flex flex-col items-start mx-auto my-5 mb-10">
          <h2 className="text-xl text-wording font-semibold mb-10">
            All Users
          </h2>
          {/* <SingleSelect
            defaultChoices={["title", "author", "price", "quantity"]}
            label="Select to sort"
            defaultSelected="title"
            marginX="mx-0"
            onChange={(tag) => handleSortBy(tag)}
          /> */}
        </div>

        <table className="w-[1300px] divide-y divide-gray-200 mx-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allUsers &&
              allUsers.map((user, index) => (
                <tr
                  className="cursor-pointer hover:bg-slate-50 delay-100"
                  key={index}
                  onClick={() => goToDetailPage(user.userID)}
                >
                  <td className="flex items-center justify-start gap-2 px-6 py-4 whitespace-nowrap">
                    <img
                      src={`${IMAGE_URL}/img/users/${user.photo}`}
                      alt=""
                      className="w-16 rounded-full"
                    />
                    <p className="text-wording font-medium">{user.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 text-gray-600">{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminPageContainer>
  );
};

export default UsersPage;
