import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("username", username);
  };

  return (
    <div className="flex flex-col py-9 gap-3">
      {/* <h1 className='text-xl font-bold'>Login</h1> */}
      <div className="flex items-center gap-4 justify-between">
        <span className="w-[10%]">
          {username ? (
            // <Icon icon="heroicons:user-20-solid" color="#7a70dd" width="20" />
            <Icon icon="teenyicons:user-solid" color="#7a70dd" width="20" />
          ) : (
            // <img src={userIcon} />
            // <Icon icon="mingcute:user-3-line" color="#8e91a0" width="20" />
            <Icon icon="teenyicons:user-outline" color="#8e91a0" width="20" />
          )}
        </span>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-4 border-b border-grey-400 placeholder-grey-400 focus:border rounded-md focus:border-blue-500 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4 justify-around">
        <span className="w-[10%]">
          {/* <img src={passwordIcon} alt="" /> */}
          {password ? (
            <Icon icon="teenyicons:lock-solid" color="#7a70dd" width="20" />
          ) : (
            <Icon icon="teenyicons:lock-outline" color="#8e91a0" width="20" />
          )}
        </span>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 border-b border-grey-400 placeholder-grey-400 focus:border rounded-md focus:border-blue-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <a href="#" className="text-end py-2 text-sm text-blue-400">
        Don't have an account?
      </a>

      <Link
        to={username && password ? "/test" : "/"}
        className="py-4 px-10 bg-blue-400 rounded-2xl text-white-400 flex justify-center items-center gap-2 hover:gap-8 transition-all duration-300"
        onClick={handleLogin}
      >
        Login
        <Icon icon="ph:arrow-up-thin" width="20" color="white" rotate={1} />
      </Link>
    </div>
  );
}
