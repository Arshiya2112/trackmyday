import { useState } from "react";
import { useAuth } from "../../authContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    if(!validateEmail(email)) {
        setEmailError("Enter a valid email id");
        return;
    }

    try {
      await signup(username, email, password);
      alert("Signup Successful!");
      navigate("/login");
    } catch (error) {
      alert("Signup Failed! " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg border border-blue-500 p-8 shadow-md w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
            Sign Up
          </h1>

          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border
                ${ emailError ? "border-red-500" : "border-gray-300" } rounded-lg p-2 focus:ring ${
                    emailError ? "focus:ring-red-300" : 
                 "focus:ring-blue-300" } outline-none`}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-700 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Sign Up
          </button>
          <span className="text-sm">Already a user? {" "} <a href="/login" className="text-blue-400 underline">Login</a></span>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup
