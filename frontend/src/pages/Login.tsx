import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";

import AuthLayout from "../components/auth/AuthLayout";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(
        auth,
        provider
      );

      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue learning with ShikshaMitra AI."
    >
      <button
        onClick={handleGoogleLogin}
        className="mb-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 font-semibold text-white transition hover:border-cyan-500 hover:bg-slate-700"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-slate-900 px-4 text-sm text-slate-400">
            OR
          </span>
        </div>
      </div>

      <form
        onSubmit={handleLogin}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block font-medium text-slate-300">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={20}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-300">
            Password
          </label>

          <div className="relative">
            <Lock
              size={20}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 py-4 pl-12 pr-14 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() =>
                setRememberMe(
                  !rememberMe
                )
              }
            />
            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-cyan-400"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-500 py-4 font-semibold text-slate-950"
        >
          <LogIn size={22} />
          Login
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-cyan-400"
          >
            Create Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}