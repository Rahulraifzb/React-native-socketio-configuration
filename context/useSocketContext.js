import React, { createContext, useContext,useEffect,useState } from "react";
import io from "socket.io-client";


const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket,setSocket] = useState(null)

    useEffect(() => {
      const soc = io.connect(
        "https://e8a5-2402-3a80-91f-736-116b-f85c-606b-8a28.in.ngrok.io",
        {
          transports: ["websocket"],
          reconnectionAttempts: 15, //Nombre de fois qu'il doit réessayer de se connecter
        }
      )
      setSocket(soc)
    },[])

    const value = {
        socket
    }

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

const useSocketContext = () => useContext(SocketContext);

export default useSocketContext;
