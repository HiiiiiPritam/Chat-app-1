import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function TypeSend() {
  const [message, setMessage]= useState("")
  const { loading, sendMesages } = useSendMessage();

  const handelSubmit =async (e)=>{
     e.preventDefault();
      await sendMesages(message)
      setMessage("")
  }
  return (
    <form onSubmit={handelSubmit}>
      <div className="w-full flex items-center space-x-2 h-[8vh] py-2 bg-slate-500">
      <input
        type="text"
        placeholder="Type here"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        className="input bg-slate-900 flex-grow  w-full max-w-xs text-slate-300"
      />

      <button>
        <IoSend className="text-3xl" />
      </button>
    </div>
    </form>
  );
}

export default TypeSend;
