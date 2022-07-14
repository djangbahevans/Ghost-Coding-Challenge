import { createContext, useContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";

const socketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  })

  useEffect(() => {
    if (!socket.connected)
      socket.connect();

    return () => {
      console.log("Disconnecting from server");
      socket.disconnect();
    } 
  }, [socket]);

  return <socketContext.Provider value={socket}>{children}</socketContext.Provider>;
}

export const useSocket = () => {
  const socket = useContext(socketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
}
