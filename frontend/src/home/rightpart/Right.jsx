import React, { useEffect } from 'react'
import Chatuser from './Chatuser';
import Messages from './Messages';
import TypeSend from './TypeSend';
import { useConversation } from '../../zustand/useConversation.js';
import Loading from '../../components/Loading.jsx';
import {useAuth} from '../../context/Authprovider.jsx'

function Right() {
  const {selectedConversation,setSelectedConversation}= useConversation()
  ///could not understand//////////////////////////
  // useEffect(()=>{
  //   return setSelectedConversation(null)
  // },[setSelectedConversation])
  return (
    <div className="w-4/5 bg-slate-600  flex flex-col border-l-4 border-slate-200">
    <div>
      {
      !selectedConversation?(<NOChatSelected/>):(
    <>
     <Chatuser/>
      <div className='overflow-y-auto ' style={{maxHeight:"calc(92vh - 8vh)"}}>
      <Messages/>
      </div>
      <TypeSend/>
    </>
     
      )
    }
    </div>
    </div>
    
  );
}

export default Right

const NOChatSelected = ()=>{
  const [authUser]= useAuth();
  return <>
  <div className='flex h-screen w-full bg-slate-700 text-xl text-white items-center justify-center'>
    <h1 className='text-center'> Welcome <span className='font-bold'>{authUser.user.fullname}</span>
    <br />
    No chat was found selected, select chat to start conversation
    </h1>
  </div>
  </>
}