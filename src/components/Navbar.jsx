import React from "react";

function Navbar({ user, onLogout, isDarkTheme, setIsDarkTheme }) {
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", JSON.stringify(newDarkTheme));
  };

  return (
    <nav
      className={`py-2 ${
        isDarkTheme ? "bg-gray-900" : "bg-blue-500"
      } shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className={`text-xl font-semibold ${
            isDarkTheme ? "text-white" : "text-gray-100"
          }`}
        >
          X-Chat
        </h1>
        {!user ? (
          <button
            onClick={toggleDarkTheme}
            className={`px-4 py-2 rounded ${
              isDarkTheme ? "bg-gray-700 text-white" : "bg-white text-gray-700"
            }`}
          >
            {isDarkTheme ? "Light Theme" : "Dark Theme"}
          </button>
        ) : (
          <div className="flex space-x-4 items-center">
            <button
              onClick={toggleDarkTheme}
              className={`px-4 py-2 rounded ${
                isDarkTheme
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {isDarkTheme ? "Light Theme" : "Dark Theme"}
            </button>
            <button
              onClick={onLogout}
              className={`px-4 py-2 rounded ${
                isDarkTheme
                  ? "bg-red-600 text-white"
                  : "bg-red-500 text-gray-100"
              }`}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
