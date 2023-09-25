/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactMe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSucces, setIsSucces] = useState(false);
  const { user_mp } = useParams();

  const [isFound, setIsFound] = useState(false);

  const saveMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("user_mp", user_mp);
    console.log(formData);
    try {
      await axios.post("http://localhost:8000/api/message", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/misc/")
      .then((response) => response.json())
      .then((json) => {
        const filteredMisc = json.filter((misc) => misc.user_mp === user_mp);
        if (filteredMisc.length > 0) {
          setIsFound(true);
        }
      });
  });

  const succesSubmit = () => {
    setIsSucces(true);
  };

  return (
    <>
      <div className="test h-screen w-screen fixed z-[-10]">
        <br />
      </div>
      {isFound && (
        <div className="test min-h-screen h-full w-screen py-20 flex flex-col justify-center items-center">
          <h1 className="md:text-6xl text-4xl md:mt-2 mt-24 projectName">
            Contact Me
          </h1>
          <form
            action="http://localhost:8000/api/message"
            onSubmit={saveMessage}
            method="POST"
            className="mt-2 flex flex-col justify-between font1 "
          >
            <label htmlFor="" className="pt-3" placeholder="Example">
              Name
            </label>
            <input
              type="text"
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="" className="pt-3">
              Email
            </label>
            <input
              type="text"
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="" className="pt-3">
              Message
            </label>
            <textarea
              id=""
              cols="30"
              rows="7"
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              name="name"
              type="submit"
              onClick={succesSubmit}
              className=" place-self-end rounded rounded-md mt-3 bg-orange-500 hover:bg-orange-600 hover:scale-110 text-white transition-all duration-75 ease-in w-1/4 px-2"
            >
              Kirim
            </button>
          </form>
          <p className={`${isSucces ? "inline" : "hidden"} font1`}>
            Succes Submit Message
          </p>
        </div>
      )}
      {!isFound && (
        <div className="flex h-screen w-screen justify-center items-center text-white">
          <h1 className="projectName md:text-7xl text-4xl text-center">
            Page not found 404
          </h1>
        </div>
      )}
    </>
  );
}

export default ContactMe;
