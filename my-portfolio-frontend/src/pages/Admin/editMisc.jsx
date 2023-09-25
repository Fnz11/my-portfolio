/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function createMisc() {
  const [profilTitle, setProfilTitle] = useState("");
  const [profilImage, setProfilImage] = useState("");
  const [profilDesc, setProfilDesc] = useState("");
  const [skillDesc, setSkillDesc] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [twitter, setTwitter] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [youtube, setYoutube] = useState("");

  const { user_mp } = useParams();
  const { user } = useAuthContext();
  const [user_id, setUser_id] = useState("");
  let user_mpStatus = false;

  //SKILLS
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillsOptions = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "NodeJs", label: "Node Js" },
    { value: "ReactJs", label: "React Js" },
    { value: "VueJs", label: "Vue Js" },
    { value: "Bootstrap", label: "Bootstrap" },
    { value: "TailwindCss", label: "Tailwind Css" },
  ];
  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedSkills((prevSkills) => [...prevSkills, value]);
    } else {
      setSelectedSkills((prevSkills) =>
        prevSkills.filter((skill) => skill !== value)
      );
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/misc/");
      const filteredMisc = response.data.filter(
        (misc) => misc.user_mp === `${user_mp}`
      );
      if (filteredMisc.length > 0) {
        user_mpStatus = true;
        const data = filteredMisc[0];
        setUser_id(data.id);
        setProfilTitle(data.profilTitle);
        setProfilDesc(data.profilDesc);
        setProfilImage(data.profilImage);
        setSkillDesc(data.skillDesc);
        setSelectedSkills(data.skills.split(","));
        setEmail(data.email);
        setInstagram(data.instagram);
        setLinkedIn(data.linkedin);
        setTiktok(data.tiktok);
        setTwitter(data.twitter);
        setWhatsapp(data.whatsapp);
        setYoutube(data.youtube);
      }
    };
    fetchData();
  }, [user_mp]);

  const saveMisc = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilTitle", profilTitle);
    formData.append("profilImage", profilImage);
    formData.append("profilDesc", profilDesc);
    formData.append("skillDesc", skillDesc);
    formData.append("skills", selectedSkills.join(","));
    formData.append("email", email);
    formData.append("instagram", instagram);
    formData.append("linkedin", linkedIn);
    formData.append("tiktok", tiktok);
    formData.append("twitter", twitter);
    formData.append("whatsapp", whatsapp);
    formData.append("youtube", youtube);

    try {
      await axios.patch(`http://localhost:8000/api/misc/${user_id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("SKIIILLL");
          navigate(`/${user_mp}`);
    } catch (error) {
      console.log("SKIILLL", error);
    }
  };

  return (
    <>
      <div className="test h-screen w-screen fixed z-[-10]">
        <br />
      </div>
      {user && (
        <div className="text-white h-full w-screen flex py-20 flex-col justify-center items-center">
          <h1 className="md:text-6xl text-4xl projectName">Edit Misc</h1>
          <form
            action="http://localhost:8000/api/message"
            onSubmit={saveMisc}
            method="POST"
            className="mt-3 flex flex-col font1"
          >
            <div className="flex md:flex-row flex-col justify-between gap-5">
              <div className="flex flex-col">
                <h1 className="text-2xl text-orange-500">Profil</h1>
                <label htmlFor="" className="pt-3" placeholder="Example">
                  Title
                </label>
                <input
                  type="text"
                  value={profilTitle}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="name"
                  onChange={(e) => setProfilTitle(e.target.value)}
                />
                <label htmlFor="" className="pt-3">
                  Image
                </label>
                <input
                  type="text"
                  value={profilImage}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="email"
                  onChange={(e) => setProfilImage(e.target.value)}
                />
                <label htmlFor="" className="pt-3">
                  Desc
                </label>
                <textarea
                  id=""
                  cols="30"
                  rows="7"
                  value={profilDesc}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="message"
                  onChange={(e) => setProfilDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl text-orange-500">Skill</h1>
                <label htmlFor="" className="pt-3">
                  Desc
                </label>
                <textarea
                  id=""
                  cols="30"
                  rows="7"
                  value={skillDesc}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="message"
                  onChange={(e) => setSkillDesc(e.target.value)}
                ></textarea>
                <label htmlFor="" className="pt-3">
                  Skills
                </label>
                <div>
                  {skillsOptions.map((option) => (
                    <label key={option.value} className="block">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={selectedSkills.includes(option.value)}
                        className="mr-2 "
                        onChange={handleSkillsChange}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl text-orange-500">Sosmed</h1>
                <label htmlFor="" className="pt-3">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="name"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="" className="pt-3">
                  Instagram
                </label>
                <input
                  type="text"
                  value={instagram}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="name"
                  onChange={(e) => setInstagram(e.target.value)}
                />
                <label htmlFor="" className="pt-3">
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={linkedIn}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="name"
                  onChange={(e) => setLinkedIn(e.target.value)}
                />
                <label htmlFor="" className="pt-3">
                  Tiktok
                </label>
                <input
                  type="text"
                  value={tiktok}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="name"
                  onChange={(e) => setTiktok(e.target.value)}
                />
                <label htmlFor="" className="pt-3">
                  Twitter
                </label>
                <input
                  type="text"
                  value={twitter}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="name"
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <label htmlFor="" className="pt-3">
                  Whatsapp
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="name"
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
                <label htmlFor="" className="pt-3">
                  Youtube
                </label>
                <input
                  type="text"
                  value={youtube}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="name"
                  onChange={(e) => setYoutube(e.target.value)}
                />
                <label htmlFor="" className="pt-3">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
                  name="name"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button
              name="name"
              type="submit button"
              className=" place-self-end rounded rounded-md font-semibold py-1 font1 mt-3 bg-orange-500 hover:bg-orange-600 hover:scale-110 text-white transition-all duration-75 ease-in px-5"
            >
              Kirim
            </button>
          </form>
        </div>
      )}
      {user_mpStatus && (
        <div className="flex h-screen w-screen justify-center items-center text-white">
          <h1 className="projectName md:text-7xl text-4xl text-center">
            Page not found 404
          </h1>
        </div>
      )}
      {!user && (
        <div className="flex h-screen w-screen justify-center items-center text-white">
          <h1 className="projectName md:text-7xl text-4xl text-center">
            You are not admin
          </h1>
        </div>
      )}
    </>
  );
}

export default createMisc;
