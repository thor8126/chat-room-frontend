import React, { useState } from "react";

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      handleLogin(username);
    }
  };

  return (
    <div className="w-full text-center p-4">
      <h2 className="text-xl mb-4">Login or Signup to start chatting</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="px-3 py-2 mt-2 rounded bg-blue-500 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
