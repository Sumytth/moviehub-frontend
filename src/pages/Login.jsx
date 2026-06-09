import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { googleLogin, signUp, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        await signUp(email, password);
        alert("Account created successfully!");
      } else {
        await login(email, password);
        alert("Logged in successfully!");
      }

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        alert("Email already exists.");
      } else if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 px-8 py-6">
        <Link
          to="/"
          className="text-netflix text-3xl md:text-4xl font-bold cursor-pointer"
        >
          MOVIEHUB
        </Link>
      </div>

      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-black/75 p-8 rounded-md mt-10">
          <h2 className="text-white text-3xl font-bold mb-8">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>

          {location.state?.message && (
            <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 p-3 rounded mb-4">
              {location.state.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded bg-gray-700 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded bg-gray-700 text-white outline-none"
            />

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded font-semibold"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition"
          >
            Continue with Google
          </button>

          <div className="text-gray-400 mt-6 text-center">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-white hover:underline"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                New to MovieHub?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-white hover:underline"
                >
                  Sign Up now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;