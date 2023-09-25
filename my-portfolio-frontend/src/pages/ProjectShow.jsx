/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EditWebPlace() {
  const [websShow, setWebsShow] = useState(null);
  const { user_mp } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/api/websshow")
      .then((response) => response.json())
      .then((json) => {
        const filteredWebsShow = json.filter(
          (web) => web.user_mp === `${user_mp}`
        );
        setWebsShow(filteredWebsShow);
      });
  }, [user_mp]);

  return (
    <>
      <div className="test h-screen w-screen fixed z-[-10]">
        <br />
      </div>
      {websShow && websShow.length > 0 && (
        <div className="flex font1 md:flex-row flex-col text-center md:justify-end justify-start pt-20 h-screen w-screen gap-10 text-white">
          <div className="flex flex-col justify-center">
            <h1 className="md:text-6xl text-4xl projectName md:w-full w-7/12 md:mt-10 md:ml-0 ml-36">
              My Project
            </h1>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-5 place-content-start h-full md:w-ful w-8/12 ml-36 ">
              {websShow &&
                websShow.map((item) => (
                  <Link
                    to={`http://localhost:5173/${user_mp}/project/${item.id}`}
                    key={item.id}
                    className="drop-shadow-xl test2 aspect-[3/4] rounded-lg group scale-95 transition-all duration-300 "
                  >
                    <div
                      className={`hover-group:contrast-125 bg-[url("${item.img}")] flex flew-row justify-center items-center h-full w-full rounded-sm bg-center bg-cover group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
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
      {websShow && websShow.length === 0 && (
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
