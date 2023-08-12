import React, { useState } from "react";

function LoginForm({ onLogin, isDarkTheme }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onLogin(username);
    }
  };

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center p-4 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div
        className={`w-96 p-6 rounded-lg shadow-lg ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl mb-4 ${
            isDarkTheme ? "text-white" : "text-gray-800"
          }`}
        >
          Login or Signup to start chatting
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className={`w-full border p-2 rounded ${
              isDarkTheme ? "bg-gray-700 text-white" : ""
            }`}
          />
          <button
            type="submit"
            className={`w-full mt-4 rounded py-2 ${
              isDarkTheme ? "bg-blue-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
