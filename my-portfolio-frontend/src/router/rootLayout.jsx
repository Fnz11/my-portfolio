import { Link, Outlet, useParams } from "react-router-dom";
import {
  BeakerIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function RootLayout() {
  const [isOpen, setisOpen] = useState(false);
  const { user_mp } = useParams();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const buttonClick = () => {
    setisOpen(!isOpen);
  };

  const [sosmed, setSosmed] = useState(null);

  //ADMIN ATAU BUKAN
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const checkAdminStatus = () => {
    if (user) {
      setLoadUser(true);
      if (user.username === user_mp) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        // console.log("Apakah ", user.username, " === ", user_mp, " Jawabannya: ", isAdmin)
      }
    }
  };
  useEffect(() => {
    if (!loadUser) {
      checkAdminStatus();
    }
  });

  const handleLogOut = () => {
    logout();
  };

  useEffect(() => {
    checkAdminStatus();
    fetch("http://localhost:8000/api/misc")
      .then((response) => response.json())
      .then((json) => setSosmed(json));
  }, []);

  return (
    <>
      <nav className="w-full mt-2 pr-4 fixed bg-transparent z-10">
        <div className="md:pr-10 pl-5 py-4 pr-7 md:flex justify-center md:justify-between items-center">
          {/* LOGO ======================== */}
          <span className="flex justify-between text-white">
            <Link
              to={`/${user_mp}`}
              className="flex font1 text-2xl items-center hover:text-orange-600 text-orange-500 hover:scale-125 hover:rotate-3 transition-all transition-all duration-75"
            >
              <BeakerIcon className="w-7 h-7" />
              <b>MP</b>
            </Link>

            <span className="flex">
              {/* DROPDOWN BUTTON =============== */}
              <span
                onClick={buttonClick}
                className="w-7 h-7 fixed right-4 top-6 md:hidden hover:text-orange-500 hover:scale-110 duration-75 ease-in "
              >
                {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
              </span>

              {/* BUTTON ======================== */}
              <div className="mt-1 mr-2 hover:scale-110 transition-all duration-300 hover:rotate-3 group">
                <Link
                  className="md:hidden font1 font-semibold text-sm md:inline py-2 px-4 btn bg-orange-500 text-white rounded font-semibold group-hover:bg-orange-600 transition-all duration-300"
                  to={`/${user_mp}/contactme`}
                >
                  Contact Me
                </Link>
              </div>
              {user && isAdmin && (
                <div className="mx-3 hover:scale-110 hover:rotate-3 transition-all duration-300 group">
                  <Link
                    to={`/${user_mp}/user`}
                    className="md:hidden inline aspect-square p-2 rounded rounded-full bg-blue-500 group-hover:bg-blue-600 text-white transition-all duration-300"
                  >
                    MP
                  </Link>
                </div>
              )}
            </span>
          </span>

          {/* LINKS ========================= */}
          <span
            className={`md:flex items-center justify-center ${
              isOpen == false ? "hidden" : ""
            }`}
          >
            <ul
              className={`flex flex-col font1 font-semibold text-sm md:flex-row text-white md:bg-transparent md:p-0 md:mt-0 items-center z-10 transition-all duration-500 ease-in ${
                isOpen
                  ? "bg-black/50 backdrop-blur-sm rounded-lg rounded p-5 mt-4"
                  : ""
              }`}
            >
              <li className="md:my-0 my-3">
                <Link
                  className="md:my-0 md:px-3 font-semibold hover:text-orange-500 transition-all duration-300 hover:border-b-4 hover:border-white p-2 transition-all duration-75"
                  to={`/${user_mp}`}
                >
                  Profil
                </Link>
              </li>
              <li className="md:my-0 my-3">
                <Link
                  className="md:my-0 md:px-3 font-semibold hover:text-orange-500 transition-all duration-300 hover:border-b-4 hover:border-white p-2 transition-all duration-75"
                  to={`/${user_mp}/skill`}
                >
                  Skill
                </Link>
              </li>
              <li className="md:my-0 my-3">
                <Link
                  className="md:my-0 md:px-3 font-semibold hover:text-orange-500 transition-all duration-300 hover:border-b-4 hover:border-white p-2 transition-all duration-75"
                  to={`/${user_mp}/project`}
                >
                  Project
                </Link>
              </li>
              {user && isAdmin && (
                <li className="md:my-0 my-3">
                  <Link
                    className="md:my-0 font-semibold hover:text-orange-500 transition-all duration-300 hover:border-b-4 hover:border-white  p-2 transition-all duration-75"
                    to={`/${user_mp}/message`}
                  >
                    Message
                  </Link>
                </li>
              )}
              {user && (
                <li className="md:my-0 my-3">
                  <Link
                    to={`/${user_mp}`}
                    onClick={handleLogOut}
                    className="inline md:hidden font1 font-semibold hover:text-orange-500 hover:border-b-4 duration-75 transition-all py-1 border-white ml-1 text-white "
                  >
                    Log Out
                  </Link>
                </li>
              )}
              {!user && (
                <>
                  <li className="md:my-0 my-3">
                    <Link
                      className="inline md:hidden md:my-0 md:px-3 font-semibold hover:text-orange-500 transition-all duration-300 hover:border-b-4 hover:border-white p-2 transition-all duration-75"
                      to={`/login`}
                    >
                      Log In
                    </Link>
                  </li>
                  <li className="md:my-0 my-3">
                    <Link
                      className="inline md:hidden md:my-0 md:px-3 font-semibold hover:text-orange-500 transition-all duration-300 hover:border-b-4 hover:border-white p-2 transition-all duration-75"
                      to={`/signup`}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <span className="hover:scale-110 transition-all duration-300 hover:rotate-3  hover:text-white group">
              <Link
                className="hidden font1 font-semibold text-sm md:inline py-2 px-4 md:ml-4 btn bg-orange-500 text-white md:static rounded font-semibold group-hover:bg-orange-600 transition-all duration-300"
                to={`/${user_mp}/contactme`}
              >
                Contact Me
              </Link>
            </span>
            {user && isAdmin && (
              <div className="ml-3 hover:scale-110 hover:rotate-3 transition-all duration-300 group">
                <Link
                  to={`/${user_mp}/user`}
                  className="hidden md:inline aspect-square p-2 rounded rounded-full bg-blue-500 group-hover:bg-blue-600 text-white transition-all duration-300"
                >
                  MP
                </Link>
              </div>
            )}
            {user && (
              <Link
                to={`/${user_mp}`}
                onClick={handleLogOut}
                className="md:inline ml-3 text-orange-500 font1 hidden font-semibold hover:text-orange-600 transition-all duration-300"
              >
                Log Out
              </Link>
            )}
            {!user && (
              <>
                <li className="md:my-0 my-3">
                  <Link
                    className="md:inline text-orange-500 font1 hidden font-semibold hover:text-orange-600 transition-all duration-300"
                    to={`/login`}
                  >
                    Log In
                  </Link>
                  <Link
                    className="md:inline ml-3 text-orange-500 font1 hidden font-semibold hover:text-orange-600 transition-all duration-300"
                    to={`/signup`}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </span>
        </div>
      </nav>
      <div className="">
        {sosmed &&
          sosmed.map((item) => (
            <div
              key={item.id}
              className="flex flex-col mt-10 sm:pb-10 justify-items-end items-center fixed z-10 right-1 top-72"
            >
              <a
                href={`https://twitter.com/${item.twitter}`}
                className="fa-stack my-3 mx-5 hover:scale-125 transition-all duration-300 hover:rotate-6 group"
              >
                <i className="fa-solid fa-circle fa-stack-2x text-orange-500 group-hover:text-orange-600 transition-all duration-300"></i>
                <i className="fab fa-twitter fa-stack-1x fa-inverse group-hover:scale-125 transition-all duration-500"></i>
              </a>
              <a
                href={`https://instagram.com/${item.instagram}`}
                className="fa-stack my-3 mx-5 hover:scale-125 transition-all duration-300 hover:rotate-6 group"
              >
                <i className="fa-solid fa-circle fa-stack-2x text-orange-500 group-hover:text-orange-600 transition-all duration-300"></i>
                <i className="fa-brands fa-instagram fa-stack-1x fa-inverse group-hover:scale-125 transition-all duration-500"></i>
              </a>
              <a
                href={`https://www.youtube.com/user/yourchannel`}
                className="fa-stack my-3 mx-5 hover:scale-125 transition-all duration-300 hover:rotate-6 group"
              >
                <i className="fa-solid fa-circle fa-stack-2x text-orange-500 group-hover:text-orange-600 transition-all duration-300"></i>
                <i className="fa-brands fa-youtube fa-stack-1x fa-inverse group-hover:scale-125 transition-all duration-500"></i>
              </a>
              <a
                href={`https://www.linkedin.com/in/yourprofile`}
                className="fa-stack my-3 mx-5 hover:scale-125 transition-all duration-300 hover:rotate-6 group"
              >
                <i className="fa-solid fa-circle fa-stack-2x text-orange-500 group-hover:text-orange-600 transition-all duration-300"></i>
                <i className="fa-brands fa-linkedin fa-stack-1x fa-inverse group-hover:scale-125 transition-all duration-500"></i>
              </a>
            </div>
          ))}
        <p />
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
