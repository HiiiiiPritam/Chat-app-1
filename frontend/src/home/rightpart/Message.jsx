import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId == authUser.user._id;

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor= itsMe ? "bg-blue-700" : "";
  
  const createdAt =  new Date(message.createdAt)
  const formattedTime = createdAt.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  })
  return (
    <div>
      {
        <div>
          <div className={`chat ${chatName} flex flex-col mx-4`}>
          <div className={`chat-bubble ${chatColor}`}>{message.message}</div>
          <div className={`text-${chatColor}`}>{formattedTime}</div>
        </div>
        
        </div>
      }
    </div>
  );
}

export default Message;
