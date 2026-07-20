import { LogOut, UserCircle } from "lucide-react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  async function handleLogout() {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    try {
      await signOut(auth);

      alert("Logged out successfully!");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Failed to logout.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-5xl font-black">
          ⚙️ Settings
        </h1>

        <div className="rounded-3xl bg-slate-900 p-8">

          <div className="mb-8 flex items-center gap-4">
            <UserCircle
              size={60}
              className="text-cyan-400"
            />

            <div>
              <h2 className="text-2xl font-bold">
                Account
              </h2>

              <p className="text-slate-400">
                Manage your ShikshaMitra account.
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-semibold transition hover:bg-red-700"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>
      </div>
    </main>
  );
}