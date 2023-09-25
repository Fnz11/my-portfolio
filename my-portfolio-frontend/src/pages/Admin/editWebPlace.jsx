/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function EditWebPlace() {
  const [websShow, setWebsShow] = useState(null);
  const [user_mpStatus, setUser_mpStatus] = useState(false);
  const { user } = useAuthContext();
  const { user_mp } = useParams();

  useEffect(() => {
    if (user) {
      fetch("http://localhost:8000/api/websshow", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const filteredWebsShow = json.filter(
            (web) => web.user_mp === `${user_mp}`
          );
          if (filteredWebsShow.length !== 0) {
            // console.log(filteredWebsShow)
            setUser_mpStatus(true);
            setWebsShow(filteredWebsShow);
          }
        });
    }
  }, [user, user_mp]);

  return (
    <>
      <div className="test h-screen w-screen fixed z-[-10]">
        <br />
      </div>
      {user && user_mpStatus && (
        <div className="flex font1 md:flex-row flex-col text-center md:justify-end justify-start pt-20 h-screen w-screen gap-10 text-white">
          <div className="flex flex-col justify-center">
            <h1 className="md:text-6xl text-4xl projectName md:w-full w-7/12 md:mt-10 md:ml-0 ml-36">
              Edit Project
            </h1>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-5 place-content-start h-full md:w-ful w-8/12 ml-36 ">
              {websShow &&
                websShow.map((item) => (
                  <Link
                    to={`http://localhost:5173/${user.username}/project/editproject/${item.id}`}
                    key={item.id}
                    className="drop-shadow-xl test2 aspect-[3/4] rounded-lg group scale-95 transition-all duration-300 "
                  >
                    <div className={`hover-group:contrast-125 bg-[url("${item.img}")] flex flew-row justify-center items-center h-full w-full rounded-sm bg-center bg-cover group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <div className="w-3/4 flex flex-col text-center font2">
                        <h1 className="font-semibold">{item.title}</h1>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className="flex h-screen w-screen justify-center items-center text-white">
          <h1 className="projectName md:text-7xl text-4xl text-center">
            You are not admin
          </h1>
        </div>
      )}
      {!user_mpStatus && (
        <div className="flex h-screen w-screen justify-center items-center text-white">
          <h1 className="projectName md:text-7xl text-4xl text-center">
            Page not found 404
          </h1>
        </div>
      )}
    </>
  );
}

export default EditWebPlace;
