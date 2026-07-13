import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Tutor from "./pages/Tutor";
import Scanner from "./pages/Scanner";
import Quiz from "./pages/Quiz";
import PDF from "./pages/PDF";
import StudyPlanner from "./pages/StudyPlanner";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "tutor",
        element: <Tutor />,
      },
      {
        path: "scanner",
        element: <Scanner />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "pdf",
        element: <PDF />,
      },
      {
        path: "planner",
        element: <StudyPlanner />,
      },
      {
        path: "progress",
        element: <Progress />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);