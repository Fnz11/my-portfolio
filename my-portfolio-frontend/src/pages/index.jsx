/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Profil() {
  const [misc, setMisc] = useState(null);
  const { user_mp } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/api/misc/")
      .then((response) => response.json())
      .then((json) => {
        const filteredMisc = json.filter((misc) => misc.user_mp === user_mp);
        setMisc(filteredMisc);
      });
  }, [user_mp]);

  return (
    <div className="test w-screen min-h-screen h-full flex md:flex-row justify-center">
      {misc &&
        misc.map((item) => (
          <div
            key={item.id}
            className="flex md:flex-row-reverse flex-col justify-center items-center md:w-2/3"
          >
            <div>
              <img
                src={`${item.profilImage}`}
                className="w-2/3 md:ml-4 h-2/3 rounded rounded-md"
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <h1 className="p-2 mt-3 md:mt-0 projectName md:text-right text-center md:text-6xl text-4xl w-full">
                {item.profilTitle}
              </h1>
              <p className="md:text-sm text-justify text-sm font1 mx-20 md:mx-0">
                {item.profilDesc}
              </p>
            </div>
          </div>
        ))}
      {misc && misc.length === 0 && (
        <div className="flex h-screen w-screen justify-center items-center text-white">
          <h1 className="projectName md:text-7xl text-4xl text-center">
            Page not found 404
          </h1>
        </div>
      )}
    </div>
  );
}

export default Profil;
