import React, { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import axios from 'axios'
import Cookies from "js-cookie"

const Logout = () => {
 
  const [loading , setLoading]= useState(false)

  const handelLogout = async ()=>{
    try {
      setLoading(true)
      const response = await axios.post(`/api/user/logout`)
      localStorage.removeItem("ChatApp")
      Cookies.remove("jwtChatApp")
      setLoading(false)
      alert("logged out successfully")
      window.location.reload()
    } catch (error) {
      console.log("error in logout", error);
      setLoading(false)
    }
  }
  return (
    <div className=" w-2/7 fixed bottom-0 left-0">
      <div onClick={handelLogout}>
      <label className="input input-bordered flex items-center gap-[20vw]">
    <h1 className="text-black">Logout</h1>
    <IoLogOutOutline className="text-black text-xl" />
</label>
      </div>
      


    </div>
  );
};

export default Logout;
