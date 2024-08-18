import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Authprovider";
import io from 'socket.io-client'

const SocketContext = createContext();
export const SocketProvider = ({children})=>{

  const [socket, setSocket]= useState(null)
  const [authUser]= useAuth();
  const[onlineUsers, setOnlineUsers] = useState([])

  useEffect(()=>{
      if(authUser){
        const socket = io(`http://localhost:4001`,{
          query:{
            userId: authUser.user._id
          }
        });
        setSocket(socket)  
        socket.on("getOnlineUsers",(users)=>{
          setOnlineUsers(users)
        })

        return ()=> socket.close()
      }else{
        if(socket){
          socket.close();
          setSocket(null)
        }
      }
  },[authUser])

  return <SocketContext.Provider value={{socket,onlineUsers}}>
    {children}
  </SocketContext.Provider>
}


export const useSocketContext =()=> useContext(SocketContext)