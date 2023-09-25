/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Project() {
  const [web, setWeb] = useState(null);
  const { id } = useParams();
  const getWebsShowById = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/websshow/${id}`
      );
    if (!response.data) {
      return "gaada";
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      let apiUrl;
      
      console.log("datanya: ", getWebsShowById());
      if ((await getWebsShowById()) != "gaada") {
        apiUrl = `http://localhost:8000/api/websshow/${id}`;
      } else {
        apiUrl = `http://localhost:8000/api/webstop/${id}`;
      }
      
      console.log(apiUrl);
      fetch(apiUrl)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const json = await response.json();
          return json;
        })
        .then((json) => {
          console.log(json);
          setWeb(json); // Menyimpan data JSON ke state
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="test h-screen w-screen fixed z-[-10]">
        <br />
      </div>
      {web && (
        <div
          key={web.id}
          className={`bg-[url("${web.img}")] pl-44 bg-center bg-cover flex flex-col justify-center items-center h-screen w-screen pb-10`}
        >
          <div className="flex flex-col items-center justify-center rounded bg-black/50 backdrop-blur-sm py-28 w-3/4 mr-20">
            <p className="text-white text-left w-2/3 flex font1">{web.desc}</p>
            <h1 className="text-white projectName md:text-7xl w-full text-center text-5xl mb-4 mt-4">
              {web.title}
            </h1>
            <hr className="w-2/3" />
          </div>
        </div>
      )}
    </>
  );
}

export default Project;
