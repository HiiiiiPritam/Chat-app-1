import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useConversation } from '../zustand/useConversation';
import { useNavigate } from 'react-router-dom';
import useGetAllUsers from '../context/useGetAllUsers';
import { IoBackspaceSharp } from 'react-icons/io5';

function UserSearch() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { setSelectedConversation,selectedConversation ,toggleRefreshConversations} = useConversation();
  const navigate = useNavigate();

  useGetAllUsers();

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v3/user/getAllUsers');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
    
    
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log("users in search", users);
  };

  useEffect(() => {
    console.log('Selected Conversation Changed:', selectedConversation);
  }, [selectedConversation]);

  const handleUserClick = async (userId) => {
    try {
      // Create a new conversation with the selected user
      const response = await axios.post('/api/v3/conversation/start', { userId });
      console.log(response.data);
      
      setSelectedConversation(response.data.conversation);
      console.log(selectedConversation);
      toggleRefreshConversations()
       // Redirect back to the home route
      console.log("selectedConversation",selectedConversation);
    } catch (error) {
      console.error('Error starting conversation', error);
    }finally{
      
      navigate('/');
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bg-slate-700 w-full text-left text-white flex flex-col items-center py-5'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search users..."
        className="input bg-slate-900 w-full max-w-xs text-slate-300"
      />
      <div className="text-left w-3/4 py-7 flex flex-col gap-2">
        {filteredUsers.map(user => (
          <div
            key={user._id}
            onClick={() => handleUserClick(user._id)}
            className="cursor-pointer rounded-lg py-2 w-full bg-slate-400 flex justify-between text-black font-semibold px-4 text-left"
          >
            <span>{user.fullname}</span>
            <span>{user.email}</span>
          </div>
        ))}
      </div>

      <button onClick={()=>navigate('/')} className='btn bg-slate-800 text-white px-7 hover:bg-slate-900'><IoBackspaceSharp className='text-3xl'/>Back</button>
    </div>
  );
}

export default UserSearch;
