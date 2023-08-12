import React from "react";

function Navbar({ isUserLoggedIn, handleLogout }) {
  return (
    <nav className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">Chat App</h1>
        {isUserLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded text-white bg-red-500"
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
