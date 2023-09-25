/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function CreateProject() {
  const { id } = useParams();
  const [patchUrl, setPatchUrl] = useState(`gaada`);
  const { user } = useAuthContext();

  useEffect(() => {
    const showOrTop = async () => {
      if (await getWebsShowById() !== null) {
        setPatchUrl(`http://localhost:8000/api/websshow/${id}`);
        // console.log("SHOOOOOWWW")
        getWebsShowById();
      } else {
        setPatchUrl(`http://localhost:8000/api/webstop/${id}`);
        // console.log("TOOOOPPP")
        getWebsTopById();
      }
    }

    if (user) {
      showOrTop()
    }
  }, [user]);

  const getWebsShowById = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/websshow/${id}`
    );
    if (!response.data) {
      return null;
    }
    setTitle(response.data.title);
    setUrl(response.data.url);
    setImage(response.data.img);
    setDesc(response.data.desc);
    setDate(response.data.date);
  };

  const getWebsTopById = async () => {
    const response = await axios.get(`http://localhost:8000/api/webstop/${id}`);
    if (!response.data) {
      return null;
    }
    setTitle(response.data.title);
    setUrl(response.data.url);
    setImage(response.data.img);
    setDesc(response.data.desc);
    setDate(response.data.date);
  };

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const addProject = async (e) => {
    console.log(patchUrl);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("url", url);
    formData.append("img", image);
    formData.append("desc", desc);
    formData.append("date", date);
    console.log(formData.title);
    try {
      await axios.patch(patchUrl, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate(`/${user.username}/editproject`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && (
        <div className="test min-h-screen h-full w-screen py-20 flex flex-col justify-center items-center">
          <h1 className="md:text-6xl text-4xl md:mt-2 mt-24 projectName">
            Edit Project
          </h1>
          <form
            onSubmit={addProject}
            method="POST"
            className="mt-2 flex flex-col justify-between font1 "
          >
            <label htmlFor="" className="pt-3" placeholder="Example">
              Title
            </label>
            <input
              type="text"
              value={title}
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              name="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="" className="pt-3">
              Url
            </label>
            <input
              type="text"
              value={url}
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              name="Url"
              onChange={(e) => setUrl(e.target.value)}
            />
            <label htmlFor="" className="pt-3">
              Image
            </label>
            <input
              value={image}
              type="text"
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              name="Image"
              onChange={(e) => setImage(e.target.value)}
            />
            <label htmlFor="" className="pt-3">
              Desc
            </label>
            <input
              value={desc}
              type="text"
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              name="Desc"
              onChange={(e) => setDesc(e.target.value)}
            />
            <label htmlFor="" className="pt-3">
              Date
            </label>
            <input
              value={date}
              type="text"
              className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
              name="Date"
              onChange={(e) => setDate(e.target.value)}
            />
            <button
              name="name"
              type="submit"
              className=" place-self-end rounded rounded-md mt-3 bg-orange-500 hover:bg-orange-600 hover:scale-110 text-white transition-all duration-75 ease-in w-1/4 px-2"
            >
              Kirim
            </button>
          </form>
        </div>
      )}
      {!user && (
        <>
          <div className="test h-screen w-screen fixed z-[-10]">
            <br />
          </div>
          <div className="flex h-screen w-screen justify-center items-center text-white">
            <h1 className="projectName md:text-7xl text-4xl text-center">
              You are not admin
            </h1>
          </div>
        </>
      )}
    </>
  );
}

export default CreateProject;
