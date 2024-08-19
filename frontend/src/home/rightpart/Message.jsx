import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId == authUser.user._id;

  console.log("message",message);
  

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor= itsMe ? "bg-blue-700" : "";
  const nameColor= !itsMe ? "text-blue-300" : "";

  const nameToShow= message.fullname==authUser.user.fullname?"You": message.fullname;
  
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
            <span className={`font-bold ${nameColor}`}>{nameToShow}</span>
          <div className={`chat-bubble ${chatColor}`}>{message.message}</div>
          <div className={`text-${chatColor}`}>{formattedTime}</div>
        </div>
        
        </div>
      }
    </div>
  );
}

export default Message;
