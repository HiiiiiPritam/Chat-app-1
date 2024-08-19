import React, { useState } from "react";
import useGetAllUsers from "../../context/useGetAllUsers";
import { useConversation } from "../../zustand/useConversation";
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {

  const navigate = useNavigate();
  const [search, setSearch] =useState('')
  const [allusers, loading] = useGetAllUsers();
  const { setSelectedConversation}= useConversation();

  const handelClick = ()=>{
    navigate('/search')
  }

  const handelClick2 =()=>{
    navigate('/createGroup')
  }

  return (
    <div className="flex gap-2">
      <div onClick={handelClick}>
        <label className="input cursor-pointer input-bordered flex items-center gap-2">
          <div
            
            className="grow text-left bg-slate-700 text-black"
            
            value={search}
          />
          <h1 className="text-black font-bold ">Search for other users</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div onClick={handelClick2} className="bg-white rounded-lg text-center cursor-pointer font-bold text-slate-800">
        Create Group
      </div>
    </div>
  );
};

export default SearchBar;
