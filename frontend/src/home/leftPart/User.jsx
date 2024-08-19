import React from "react";
import { useConversation } from "../../zustand/useConversation";
import { useSocketContext } from "../../context/socketContext";

function User({ conversation }) {
  const { setSelectedConversation, selectedConversation } = useConversation();
  const isSelected = selectedConversation?._id == conversation._id;

  const {socket,onlineUsers} = useSocketContext()


  // Check if any member of the conversation is online
  const isOnline = conversation.members.some(member => onlineUsers.includes(member._id));
  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
    >
      <div className="flex rounded-xl duration-300 cursor-pointer space-x-4  py-4">
        <div className={`avatar ${isOnline?"online":""}`}>
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h1 className="cursor-pointer ">{conversation.fullname}</h1>
          <span className="">{conversation.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
