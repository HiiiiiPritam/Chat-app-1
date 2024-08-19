import React, { useEffect } from 'react'
import SearchBar from './Search';
import UserList from './Users';
import Logout from './Logout';
import useGetAllUsers from '../../context/useGetAllUsers';
import { useConversation } from '../../zustand/useConversation';
import useGroupAdditionSocket from '../../context/useGroupAdditionSocket';

function Left() {

  const { setSelectedConversation,selectedConversation ,toggleRefreshConversations} = useConversation();
  useGroupAdditionSocket();

  useGetAllUsers()
  return (
    <div className="w-2/6 bg-gray-800 text-white p-4">
      {/* Search Bar */}
      <SearchBar/>
      {/* User List */}
      <UserList />
      <Logout/>
    </div>
  );
}

export default Left