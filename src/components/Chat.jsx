import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io.connect("https://server-twrb.onrender.com");

function Chat({ isDarkTheme, user }) {
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
    socket.emit("sendMessage", { message, user, room: currentRoom });
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

  const chatBoxRef = useRef(null); // Ref for chat messages container

  useEffect(() => {
    // Scroll to the bottom of the chat box whenever messages change
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]); // Trigger the effect whenever messages change

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (message.startsWith("/join")) {
        // Join room logic...
      } else if (message === "/leave") {
        // Leave room logic...
      } else {
        sendMessage();
      }
    }
  };

  return (
    <div
      className={`w-screen flex ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`w-1/4 p-4 border-r ${
          isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        }`}
      >
        {/* Sidebar content */}
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
      ;{/* Main chat area */}
      <div
        className={`w-3/4 p-4 ${
          isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        }`}
      >
        {/* Chat messages */}
        <div
          id="chat-box"
          ref={chatBoxRef} // Attach the ref to the chat messages container
          className={`flex-grow overflow-y-scroll ${
            isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
          style={{ maxHeight: "calc(90vh - 6rem)", scrollbarWidth: "thin" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.user === user ? "justify-end" : "justify-start"
              } mb-2 mr-3`}
            >
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.user === user
                    ? isDarkTheme
                      ? "bg-blue-700 text-white message-right"
                      : "bg-blue-500 text-white message-right"
                    : isDarkTheme
                    ? "bg-gray-800 text-white message-left"
                    : "bg-white text-gray-700 message-left"
                } ${
                  msg.user !== user ? "ml-2 border-l-4 border-green-400" : ""
                } max-w-md`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div
          className={`mt-4 ${
            isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          }`}
          style={{
            position: "fixed",
            bottom: 0,
            width: "75%",
            padding: "1rem",
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
