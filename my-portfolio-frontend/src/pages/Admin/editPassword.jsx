/* eslint-disable no-unused-vars */
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { useChangePassword } from "../../hooks/useChangePassword";
import { useNavigate, useParams } from "react-router-dom";

function EditPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [VerifPassword, setVerifPassword] = useState("");
  const { changePassword, error, isLoading } = useChangePassword();
  const { user } = useAuthContext();
  const {user_mp} = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user.username, currentPassword, VerifPassword, newPassword);
    await changePassword(
      user.username,
      currentPassword,
      VerifPassword,
      newPassword
    );
  };

  const submitButton = () => {
    navigate(`/${user_mp}`)
  }

  //ADMIN ATAU BUKAN
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const checkAdminStatus = () => {
    if (user) {
      setLoadUser(true)
      if (user.username === user_mp){
        setIsAdmin(true)
      }
    }
  }
  useEffect(() => {
    if (!loadUser) {
      checkAdminStatus()
    }
  })

  return (
    <>
      <div className="test h-screen w-screen fixed z-[-10]"></div>
      {user && isAdmin && (
        <div className="flex flex-col items-center justify-center text-white w-screen h-screen">
          <h1 className="projectName text-5xl">Edit Password</h1>
          <form
            onSubmit={handleSubmit}
            className="mt-2 flex flex-col justify-between font1"
            action=""
          >
            <label htmlFor="">Current Password:</label>
            <input
              type="text"
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              value={currentPassword}
            />
            <label htmlFor="">Password:</label>
            <input
              type="text"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              value={newPassword}
            />
            <label htmlFor="">Verif Password:</label>
            <input
              type="text"
              onChange={(e) => setVerifPassword(e.target.value)}
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              value={VerifPassword}
            />
            <button
              disabled={isLoading}
              onClick={submitButton}
              type="submit"
              className={`place-self-end rounded rounded-md mt-3 bg-orange-500 hover:bg-orange-600 hover:scale-110 text-white transition-all duration-75 ease-in w-1/4 px-2`}
            >
              Change
            </button>
          </form>
          {error && <div className="font1 mt-2 text-orange-600">{error}</div>}
        </div>
      )}
      {!user | !isAdmin && (
        <div className="flex h-screen w-screen justify-center items-center text-white">
          <h1 className="projectName md:text-7xl text-4xl text-center">
            You are not admin
          </h1>
        </div>
      )}
    </>
  );
}

export default EditPassword;
