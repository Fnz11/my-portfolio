/* eslint-disable no-unused-vars */
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function UserProfil() {
  const { user } = useAuthContext();
  const {user_mp} = useParams()

  return (
    <>
          <div className="test h-screen w-screen fixed z-[-10]">
            <br />
          </div>
      {user !== null && user.username === user_mp ? (
        <>
          <div className="flex flex-col justify-center items-center font1 h-screen ml-28 text-white">
            <div className="text-2xl">{user.email}</div>
            <Link
            to={`/${user.username}/editpassword`}
            className="mt-1 hover:text-orange-500 trasnition-all duration-75">
              Edit Password
            </Link>
          </div>
        </>
      ) : (
        <div className="flex h-screen w-screen justify-center items-center text-white">
          <h1 className="projectName md:text-7xl text-4xl text-center">
            You are not admin
          </h1>
        </div>
      )}
      {/* {!user && (
        
      )} */}
    </>
  );
}
export default UserProfil;
