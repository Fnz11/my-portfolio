import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./rootLayout";
import ProjectLayout from "./projectLayout";
import ProjectLayoutEdit from "./projectLayoutEdit";
import UserLayout from "./userLayout";

import Profil from "../pages";
import Skill from "../pages/Skill";
import Project from "../pages/Project";
import ProjectShow from "../pages/ProjectShow";
import ContactMe from "../pages/ContactMe";
import AddProject from "../pages/Admin/addProject";
import EditProject from "../pages/Admin/editProject";
import EditMisc from "../pages/Admin/editMisc";
import Message from "../pages/Admin/Message/";
import EditWebPlace from "../pages/Admin/editWebPlace";
import UserProfil from "../pages/Admin/userProfil";

import EditPassword from "../pages/Admin/editPassword";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/:user_mp",
    element: <RootLayout />,
    children: [
      {
        path: "/:user_mp",
        element: <Profil />,
      },
      {
        path: "/:user_mp/skill",
        element: <Skill />,
      },
      {
        path: "/:user_mp/project",
        element: <ProjectLayout />,
        children: [
          {
            path: "/:user_mp/project/",
            element: <ProjectShow />,
          },
          {
            path: "/:user_mp/project/:id",
            element: <Project />,
          },
        ],
      },
      {
        path: "/:user_mp/contactme",
        element: <ContactMe />,
      },
      {
        path: "/:user_mp/editpassword",
        element: <EditPassword />,
      },
      {
        path: "/:user_mp/message",
        element: <Message />,
      },
      {
        path: "/:user_mp/project/addproject",
        element: <AddProject />,
      },
      {
        path: "/:user_mp/project/editproject/:id",
        element: <EditProject />,
      },
      {
        path: "/:user_mp/editmisc",
        element: <EditMisc />,
      },
      {
        path: "/:user_mp/editproject",
        element: <ProjectLayoutEdit />,
        children: [
          {
            path: "/:user_mp/editproject/",
            element: <EditWebPlace />,
          },
        ],
      },
      {
        path: "/:user_mp/user",
        element: <UserLayout />,
        children: [
          {
            path: "/:user_mp/user/",
            element: <UserProfil />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
