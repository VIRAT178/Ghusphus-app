import React, { useState, useRef, useContext } from "react";
import assests from "../assets/assets";
import {AuthContext} from '../../context/AuthContext'


const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
   
  const {login} = useContext(AuthContext)


  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(currState==="Sign up"? 'signup':'login',{fullName, email,password,bio})
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#141e30] via-[#243b55] to-[#3b5998] text-white flex flex-col sm:flex-row items-center justify-evenly px-6 py-12">

      {/* Left logo area */}
      <div className="w-full sm:w-[30%] flex justify-center items-center mb-12 sm:mb-0">
        <img
          src={assests.Ghusphus}
          alt="Ghusphus Logo"
          className="w-[min(30vw,250px)] mix-blend-screen drop-shadow-xl "
        />
      </div>

      {/* Right form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-2xl flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              src={assests.arrow_icon}
              alt="Back"
              onClick={() => setIsDataSubmitted(false)}
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            required
            className="px-3 py-2 rounded-md bg-white/20 border border-gray-400 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="px-3 py-2 rounded-md bg-white/20 border border-gray-400 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="px-3 py-2 rounded-md bg-white/20 border border-gray-400 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            placeholder="Provide a short Bio"
            required
            className="px-3 py-2 rounded-md bg-white/20 border border-gray-400 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-cyan-400 to-blue-600 hover:scale-[1.02] transition-transform text-white rounded-md font-semibold"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <label className="flex items-center gap-2 text-sm text-gray-200">
          <input type="checkbox" className="accent-cyan-400" />
          Agree to the terms of use & privacy policy.
        </label>

        <div className="text-sm text-gray-300">
          {currState === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-cyan-400 font-medium cursor-pointer hover:underline"
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an account{" "}
              <span
                className="text-cyan-400 font-medium cursor-pointer hover:underline"
                onClick={() => setCurrState("Sign up")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
