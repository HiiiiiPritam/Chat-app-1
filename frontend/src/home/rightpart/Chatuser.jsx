import React from 'react'
import { useConversation } from '../../zustand/useConversation'
import { useSocketContext } from '../../context/socketContext';
import { useAuth } from '../../context/Authprovider';

function Chatuser() {

  const {selectedConversation}= useConversation();
  const {onlineUsers} = useSocketContext();
  const getUserOnlineStatus= (userId)=>{
    return (selectedConversation.members.some(member => onlineUsers.includes(member._id)))?"online":"offline";
  }

  console.log(selectedConversation);
  

  // if(selectedConversation.isGroup && getUserOnlineStatus("hbdkas")=="online"){
  //   getUserOnlineStatus="some members online"
  // }
  const isOnline = selectedConversation.members.some(member => onlineUsers.includes(member._id));
  
  return (
    <div className='flex bg-slate-700 rounded-xl h-[8vh] duration-300 p-2 cursor-pointer space-x-4'>
    <div className={`avatar ${isOnline?"online":""}`}>
    <div className="w-12 rounded-full">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className='text-white'>
  <h1 className="cursor-pointer text-xl">
      {selectedConversation.fullname}
    </h1>
    <span className=''>
      
     {selectedConversation.isGroup?
      getUserOnlineStatus(selectedConversation._id)=="online"?"some members online":"Offiline memebrs": getUserOnlineStatus(selectedConversation._id)
     }
      
      </span>
  </div>
    </div>
  )
}

export default Chatuser