import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

function Message() {
  const [message, setMessage] = useState(null);
  const { user } = useAuthContext();
  const { user_mp } = useParams();

  //ADMIN ATAU BUKAN
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const checkAdminStatus = () => {
    if (user) {
      setLoadUser(true);

      //FECTH
      fetch("http://localhost:8000/api/message/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const filteredMessages = json.filter(
            (message) => message.user_mp === `${user_mp}`
          );
          setMessage(filteredMessages);
        });
      if (user.username === user_mp) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  };
  useEffect(() => {
    if (!loadUser) {
      checkAdminStatus();
    }
  });

  return (
    <>
      <div className="test h-screen w-screen fixed z-[-10]">
        <br />
      </div>
      {user && isAdmin && (
        <div className="text-white h-full w-full flex flex-col py-20 items-center">
          <h1 className="projectName md:text-7xl text-4xl">Message</h1>
          {message &&
            message.map((item) => (
              <div
                key={item.id}
                className="text-start w-full px-20 pt-10 font1"
              >
                <h5>
                  <b>Name:</b> {item.name}
                </h5>
                <h5>
                  <b>Email:</b> {item.email}
                </h5>
                <h5>
                  <b>Message:</b> {item.message}
                </h5>
                <hr className="my-16" />
              </div>
            ))}
            {message && message.length === 0 && (
              <div className="mt-5 font1">
                No message
              </div>
            )}
        </div>
      )}
      {!user | !isAdmin && (
        <div className="flex h-screen w-screen justify-center items-center text-white">
          <h1 className="projectName md:text-7xl text-4xl text-center">
            You are not admin
          </h1>
        </div>
      )}
    </>
  );
}

export default Message;
