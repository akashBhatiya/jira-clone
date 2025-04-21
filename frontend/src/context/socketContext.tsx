import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket;
  socketId: string | undefined;
  roomId: string | undefined;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
}

// Create context with initial undefined value
const socketContext = createContext<SocketContextType | undefined>(undefined);

// Custom hook with type safety
export const useSocket = () => {
  const context = useContext(socketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const [roomId, setRoomId] = useState<string | undefined>(undefined);

  const socket = useMemo( 
    () =>
      io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
        transports: ["websocket", "polling", "flashsocket"],
        withCredentials: true,
      }),
    []
  );

  socket.on("connect", () => {
    console.log("connected", socket.id);
    setSocketId(socket.id);
  });

  useEffect(() => {
    if (socketId) {
      socket.emit("join-room", socketId);
      setRoomId(socketId);
    }
  }, [socketId, socket]);

  const joinRoom = (room: string) => {
    socket.emit("join-room", room);
    setRoomId(roomId);
  };

  const leaveRoom = (room: string) => {
    socket.emit("leave-room", room);
    setRoomId(undefined);
  };

  const value = {
    socket,
    socketId,
    roomId,
    joinRoom,
    leaveRoom,
  };

  return (
    <socketContext.Provider value={value}> {children} </socketContext.Provider>
  );
};
