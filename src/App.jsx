import React, { useState, useEffect } from "react";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import "./index.css";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    localStorage.setItem("user", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }

    const storedDarkTheme = JSON.parse(localStorage.getItem("darkTheme"));
    if (storedDarkTheme !== null) {
      setIsDarkTheme(storedDarkTheme);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        user={user}
        onLogout={handleLogout}
        setIsDarkTheme={setIsDarkTheme}
        isDarkTheme={isDarkTheme}
      />
      <div className="flex flex-grow bg-gray-100">
        {user ? (
          <Chat
            user={user}
            setIsDarkTheme={setIsDarkTheme}
            isDarkTheme={isDarkTheme}
          />
        ) : (
          <LoginForm onLogin={handleLogin} isDarkTheme={isDarkTheme} />
        )}
      </div>
    </div>
  );
}

export default App;
