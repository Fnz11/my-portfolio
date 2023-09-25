import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, email, password);
  };

  return (
    <>
      <div className="test h-screen w-screen fixed z-[-10]"></div>
      <div className="flex flex-col items-center justify-center text-white w-screen h-screen">
        <h1 className="projectName text-5xl">Signup</h1>
        <form
          className="mt-2 flex flex-col justify-between font1"
          action=""
          onSubmit={handleSubmit}
        >
          <label htmlFor="">Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
            value={username}
          />
          <label htmlFor="">Email:</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
            value={email}
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-96 rounded rounded-md mt-1 text-black px-2 py-1"
            value={password}
          />
          <button
          disabled={isLoading}
            type="submit"
            className="place-self-end rounded rounded-md mt-3 bg-orange-500 hover:bg-orange-600 hover:scale-110 text-white transition-all duration-75 ease-in w-1/4 px-2"
          >
            Sign Up
          </button>
        </form>
        {error && <div className="font1 mt-2 text-orange-600">{error}</div>}
      </div>
    </>
  );
}

export default Signup;
