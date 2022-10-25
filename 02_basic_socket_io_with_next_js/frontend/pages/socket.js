import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const Socket = () => {
  const saver = useRef();
  const [input, setInput] = useState("");
  const [msgReceieved, setMsgReceieved] = useState([]);
  const [typ, setTyp] = useState("");
  let nasreen = [];
  //   useEffect(() => {
  //     if (saver.current === undefined) {
  //       saver.current = [];
  //     }
  //   }, []);

  //   useEffect(() => {
  //     console.log("some one sent a msg");
  //   }, [saver, socket]);

  useEffect(() => {
    socket.on("msg_received", (data) => {
      setMsgReceieved((m) => [...m, data.msg]);
    });
    
    socket.on("typing", () => {
      setTyp("someone is typing");
      setTimeout(() => {
        setTyp("");
      }, 1500);
    });
  }, [socket]);

  const sendMsg = () => {
    socket.emit("send_msg", {
      msg: input,
    });
    setInput("");
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          socket.emit("typing");
        }}
      />
      <div>
        <button onClick={sendMsg}>Send the message</button>
      </div>
      <hr />
      <div>
        Message received:
        <div>
          <ul>
            {msgReceieved.map((fruit, index) => (
              <li key={index}>{fruit}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>{typ}</div>
    </div>
  );
};

export default Socket;
