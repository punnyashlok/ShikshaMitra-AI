import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/layouts/Navbar";

import Dashboard from "./pages/Dashboard";
import Tutor from "./pages/Tutor";
import Scanner from "./pages/Scanner";
import Quiz from "./pages/Quiz";
import PDF from "./pages/PDF";
import Progress from "./pages/Progress";
import StudyPlanner from "./pages/StudyPlanner";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/tutor"
          element={<Tutor />}
        />

        <Route
          path="/scanner"
          element={<Scanner />}
        />

        <Route
          path="/quiz"
          element={<Quiz />}
        />

        <Route
          path="/pdf"
          element={<PDF />}
        />

        <Route
          path="/progress"
          element={<Progress />}
        />

        <Route
          path="/planner"
          element={<StudyPlanner />}
        />

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

      </Routes>

    </BrowserRouter>
  );
}