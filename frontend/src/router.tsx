import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Tutor from "./pages/Tutor";
import Scanner from "./pages/Scanner";
import Quiz from "./pages/Quiz";
import PDF from "./pages/PDF";
import StudyPlanner from "./pages/StudyPlanner";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

export const router = createBrowserRouter([
  // ==========================
  // Authentication Pages
  // ==========================

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  // ==========================
  // Protected Application
  // ==========================

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

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