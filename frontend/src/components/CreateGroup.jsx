import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useGetAllUsers from '../context/useGetAllUsers';
import { useConversation } from '../zustand/useConversation';
import { IoBackspaceSharp, IoCreate } from 'react-icons/io5';

function CreateGroup() {
  
  const { setSelectedConversation,selectedConversation ,toggleRefreshConversations} = useConversation();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [allUsers,setAllUsers] = useState([])
  const navigate = useNavigate();
   
  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v3/user/getAllUsers');
        setAllUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length === 0) {
      alert('Please enter a group name and select at least one user.');
      return;
    }
    console.log("selected Users", selectedUsers);
    
    try {
      const response = await axios.post('/api/v2/group/createGroup', {
        groupName,
        members: selectedUsers,
      });

      console.log(response.data);
      toggleRefreshConversations();
      navigate('/'); // Redirect back to the home route
    } catch (error) {
      console.error('Error creating group', error);
    }
  };

  return (
    <div className='bg-slate-600 w-full flex flex-col items-center py-5'>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group Name"
        className="input bg-slate-900 w-full max-w-xs text-slate-300"
      />

      <div className="mt-10 bg-slate-500 w-2/3 text-center space-y-2 py-4 px-7 rounded-lg">
        {allUsers.map(user => (
          <div
            key={user._id}
            onClick={() => handleUserSelect(user._id)}
            className={`cursor-pointer  rounded-lg py-2 ${selectedUsers.includes(user._id) ? 'bg-blue-500' : 'bg-slate-100'}`}
          >
            {user.fullname}
          </div>
        ))}
      </div>
        <div className='flex gap-4 justify-center items-center'> 
      <button onClick={handleCreateGroup} className="btn bg-green-800 text-white hover:bg-green-900 mt-4">
        <IoCreate className='text-3xl'/>
        Create Group
      </button>
      <button onClick={()=>navigate('/')} className='btn bg-slate-800 text-white px-7 hover:bg-slate-900 mt-4'><IoBackspaceSharp className='text-3xl'/>Back</button>
        </div>
    </div>
  );
}

export default CreateGroup;
