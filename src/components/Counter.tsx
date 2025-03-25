"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getSocket } from "@/config/socket";

export default function Counter() {
  const [counter, setCounter] = useState(0);
  const socket = useMemo(() => {
    const socket = getSocket();
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.emit("message", "Test");

    socket.on("add", (payload) => {
      setCounter((prev) => prev + 1);
    });
    socket.on("subtract", (payload) => {
      setCounter((prev) => prev - 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = (type: string) => {
    if (type === "add") {
      socket.emit("add", 1);
    } else {
      socket.emit("subtract", 1);
    }
  };

  return (
    <div>
      <h1>{counter}</h1>
      <div style={{ display: "flex", gap: "1.2rem" }}>
        <button onClick={() => handleClick("add")}>Add</button>
        <button onClick={() => handleClick("subtract")}>Subtract</button>
      </div>
    </div>
  );
}
