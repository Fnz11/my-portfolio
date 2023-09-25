/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Skill() {
  const [misc, setMisc] = useState(null);
  const { user_mp } = useParams();

  const [HTML, setHTML] = useState(false)
  const [CSS, setCSS] = useState(false)
  const [JavaScript, setJavaScript] = useState(false)
  const [NodeJs, setNodeJs] = useState(false)
  const [ReactJs, setReactJs] = useState(false)
  const [VueJs, setVueJs] = useState(false)
  const [Bootstrap, setBootstrap] = useState(false)
  const [TailwindCss, setTailwindCss] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8000/api/misc/")
      .then((response) => response.json())
      .then((json) => {
        const filteredMisc = json.filter((misc) => misc.user_mp === user_mp);
        let data = null
        if (filteredMisc.length > 0) {
          data = filteredMisc[0]
          setHTML(data.skills.includes("HTML"))
          setCSS(data.skills.includes("CSS"))
          setJavaScript(data.skills.includes("JavaScript"))
          setNodeJs(data.skills.includes("NodeJs"))
          setReactJs(data.skills.includes("ReactJs"))
          setVueJs(data.skills.includes("VueJs"))
          setBootstrap(data.skills.includes("Bootstrap"))
          setTailwindCss(data.skills.includes("TailwindCss"))
        }
        setMisc(data);
      });
  }, [user_mp]);

  return (
    <>
      <div className="test h-screen w-screen fixed z-[-10]">
        <br />
      </div>
      {misc && (
        <div className="flex text-white justify-center">
          <div className="flex w-3/4 flex-col h-full py-20 justify-center items-center">
            <h1 className="projectName md:text-7xl text-5xl mb-4">Skill</h1>
            <div className="flex flex-col">
              {misc && (
                  <p
                    key={misc.id}
                    className="font1 w-full text-justify md:mr-0 mr-4"
                  >
                    {misc.skillDesc}
                  </p>
                )}
              <div className="grid md:grid-cols-4 grid-cols-2 md:mt-5 gap-4 mt-3">
                <div
                  to={""}
                  className={`flex flex-col justify-center items-center gap-4 mt-5 font1 ${HTML ? "inline" : "hidden"}`}
                >
                  <i className="fa-brands fa-html5 fa-2xl text-orange-500"></i>
                  <h1>HTML</h1>
                </div>
                <div
                  to={""}
                  className={`flex flex-col justify-center items-center gap-4 mt-5 font1 ${CSS ? "inline" : "hidden"}`}
                >
                  <i className="fa-brands fa-css3-alt fa-2xl text-orange-500"></i>
                  <h1>CSS</h1>
                </div>
                <div
                  to={""}
                  className={`flex flex-col justify-center items-center gap-4 mt-5 font1 ${JavaScript ? "inline" : "hidden"}`}
                >
                  <i className="fa-brands fa-js fa-2xl text-orange-500"></i>
                  <h1>JavaScript</h1>
                </div>
                <div
                  to={""}
                className={`flex flex-col justify-center items-center gap-4 mt-5 font1 ${NodeJs ? "inline" : "hidden"}`} 
                >
                  <i className="fa-brands fa-node-js fa-2xl text-orange-500"></i>
                  <h1>Node Js</h1>
                </div>
                <div
                  to={""}
                className={`flex flex-col justify-center items-center gap-4 mt-5 font1 ${ReactJs ? "inline" : "hidden"}`} 
                >
                  <i className="fa-brands fa-react fa-2xl text-orange-500"></i>
                  <h1>React Js</h1>
                </div>
                <div
                  to={""}
                className={`flex flex-col justify-center items-center gap-4 mt-5 font1 ${VueJs ? "inline" : "hidden"}`} 
                >
                  <i className="fa-brands fa-vuejs fa-2xl text-orange-500"></i>
                  <h1>Vue Js</h1>
                </div>
                <div
                  to={""}
                className={`flex flex-col justify-center items-center gap-4 mt-5 font1 ${Bootstrap ? "inline" : "hidden"}`} 
                >
                  <i className="fa-brands fa-bootstrap fa-2xl text-orange-500"></i>
                  <h1>Bootstrap</h1>
                </div>
                <div
                  to={""}
                className={`flex flex-col justify-center items-center gap-4 mt-5 font1 ${TailwindCss ? "inline" : "hidden"}`} 
                >
                  <i className="fa-solid fa-wind fa-2xl text-orange-500"></i>
                  <h1>Tailwind Css</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {misc === null && (
        <div className="flex h-screen w-screen justify-center items-center text-white">
          <h1 className="projectName md:text-7xl text-4xl text-center">
            Page not found 404
          </h1>
        </div>
      )}
    </>
  );
}

export default Skill;
