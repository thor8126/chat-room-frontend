import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("general"); // Current room user is in
  const [rooms, setRooms] = useState(["general", "random", "tech"]); // Available chat rooms
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    // Emit the sendMessage event to the backend
    socket.emit("sendMessage", { message, user: "You", room: currentRoom });

    setMessage("");
  };

  useEffect(() => {
    // Fetch initial messages from the backend
    fetch("http://localhost:5000/getMessages")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const joinRoom = (room) => {
    // Emit the joinRoom event to the backend
    socket.emit("joinRoom", room);
    setCurrentRoom(room);
  };

  const leaveRoom = (room) => {
    // Emit the leaveRoom event to the backend
    socket.emit("leaveRoom", room);
    setCurrentRoom(""); // Reset current room
  };

  return (
    <div
      className={`w-screen h-screen flex ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Left panel with room list */}
      <div
        className={`w-1/4 p-4 border-r ${
          isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        }`}
      >
        <h2 className="text-lg font-semibold mb-2">Rooms</h2>
        <ul className="space-y-2">
          {rooms.map((room) => (
            <li
              key={room}
              className={`cursor-pointer ${
                room === currentRoom
                  ? "text-blue-500 font-bold"
                  : "text-gray-700"
              }`}
              onClick={() =>
                room === currentRoom ? leaveRoom(room) : joinRoom(room)
              }
            >
              #{room}
            </li>
          ))}
        </ul>
      </div>

      {/* Right panel with chat interface */}
      <div
        className={`w-3/4 p-4 flex flex-col ${
          isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        }`}
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={toggleDarkTheme}
            className={`px-3 py-1 rounded ${
              isDarkTheme ? "bg-gray-700 text-white" : "bg-white text-gray-700"
            }`}
          >
            {isDarkTheme ? "Light Theme" : "Dark Theme"}
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-2">Chat with John</h2>
        <div className="flex-grow overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.user === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.user === "You"
                    ? isDarkTheme
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white"
                    : isDarkTheme
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-700"
                } max-w-md`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow border rounded-l-md p-2 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className={`${
                isDarkTheme
                  ? "bg-gray-700 text-white"
                  : "bg-blue-500 text-white"
              } rounded-r-md p-2 ml-2`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
