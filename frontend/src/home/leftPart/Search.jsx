import React, { useState } from "react";
import useGetAllUsers from "../../context/useGetAllUsers";
import { useConversation } from "../../zustand/useConversation";

const SearchBar = () => {
  const [search, setSearch] =useState('')
  const [allusers, loading] = useGetAllUsers();
  const { setSelectedConversation}= useConversation();

  console.log("allusers",allusers);
  

  const handelSubmit = (e)=>{
      e.preventDefault();
      if(!search) return;
      const conversations = allusers.filter((user)=>(
        user.fullname.includes(search)
      ))
  }

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow bg-slate-700 text-black"
            placeholder="Search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
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
      </form>
    </div>
  );
};

export default SearchBar;
