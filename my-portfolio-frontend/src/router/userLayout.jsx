/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function userLayout() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const {user_mp} = useParams()

  const handleClick = () => {
    logout();
  };

  return (
    <>
      <span className="flex justify-start z-[-2]">
        {user && user.username === user_mp && (
          <span className=" vertical flex flex-row pt-20 pr-8 pl-10 h-screen text-white bg-black gap-4 fixed">
            <Link
              to={`http://localhost:5173/${user_mp}/editmisc`}
              className="py-1 px-2 hover:text-orange-500 transition-all uppercase font1 font-semibold text-xs  hover:border-l-4 hover:border-white hover:rounded-sm p-2 transition-all duration-75"
            >
              Edit Misc
            </Link>

            <Link
              to={`http://localhost:5173/${user_mp}/editproject`}
              className="py-1 px-2 hover:text-orange-500 transition-all uppercase font1 font-semibold text-xs  hover:border-l-4 hover:border-white hover:rounded-sm p-2 transition-all duration-75"
            >
              Edit Project
            </Link>
            <Link
              to={`/${user.username}`}
              onClick={handleClick}
              className="py-1 px-2 hover:text-orange-500 transition-all uppercase font1 font-semibold text-xs  hover:border-l-4 hover:border-white hover:rounded-sm p-2 transition-all duration-75"
            >
              Log Out
            </Link>
          </span>
        )}
        <span className="w-full justify-center">
          <p />
          <Outlet />
        </span>
      </span>
    </>
  );
}

export default userLayout;
