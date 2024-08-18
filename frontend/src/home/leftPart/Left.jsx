import React from 'react'
import SearchBar from './Search';
import UserList from './Users';
import Logout from './Logout';

function Left() {
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