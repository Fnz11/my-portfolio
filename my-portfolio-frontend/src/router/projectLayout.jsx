/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function projectLayout() {
  const [websTop, setWebsTop] = useState(null);
  const { user_mp } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/api/webstop")
      .then((response) => response.json())
      .then((json) => {
        const filteredWebsTop = json.filter(
          (web) => web.user_mp === `${user_mp}`
        );
        setWebsTop(filteredWebsTop);
      });
  }, [user_mp]);

  return (
    <>
      <span className="flex justify-start z-[-2]">
        {websTop && websTop.length > 0 && (
          <span className=" vertical flex flex-row pt-20 pr-8 pl-10 h-screen text-white bg-black/50 backdrop-blur-sm gap-4 fixed">
            {websTop &&
              websTop.map((item, index) => (
                <Link
                  key={index}
                  to={`/${user_mp}/project/${item.id}`}
                  className="py-1 px-2 hover:text-orange-500 transition-all uppercase font1 font-semibold text-xs border-l border-transparent hover:border-l-4 hover:border-white hover:rounded-sm p-2 transition-all duration-75"
                >
                  {item.title}
                </Link>
              ))}
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

export default projectLayout;
