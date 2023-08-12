import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("https://server-twrb.onrender.com");

function Chat({ isDarkTheme, setIsDarkTheme }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("general");
  const [rooms, setRooms] = useState(["general", "random", "tech"]);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket.emit("sendMessage", { message, user: "You", room: currentRoom });
    setMessage("");
  };

  useEffect(() => {
    fetch(`https://server-twrb.onrender.com/getMessages/${currentRoom}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [currentRoom]);

  const joinRoom = (room) => {
    socket.emit("joinRoom", room);
    setCurrentRoom(room);
  };

  const leaveRoom = (room) => {
    socket.emit("leaveRoom", room);
    setCurrentRoom("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div
      className={`w-screen flex ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
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
      <div
        className={`w-3/4 p-4 ${
          isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        }`}
        style={{ position: "relative" }}
      >
        <div
          className="flex-grow overflow-y-scroll"
          style={{ maxHeight: "calc(90vh - 6rem)", scrollbarWidth: "thin" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.user === "You" ? "justify-end" : "justify-start"
              } mb-2 mr-3`}
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
                } ${msg.user !== "You" ? "ml-2" : ""} max-w-md`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-4"
          style={{
            position: "fixed",
            bottom: 0,
            width: "75%",
            padding: "1rem",
            backgroundColor: isDarkTheme ? null : "#F7FAFC",
            borderTop: isDarkTheme ? "1px solid #4A5568" : "1px solid #CBD5E0",
          }}
        >
          <div className="flex justify-between">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className={`flex-grow border rounded-l-md p-2 focus:outline-none ${
                isDarkTheme ? "bg-gray-700 text-white" : ""
              }`}
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
