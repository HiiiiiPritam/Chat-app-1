import React, { useEffect } from 'react'
import User from './User';
import useGetAllUsers from '../../context/useGetAllUsers';
import { useConversation } from '../../zustand/useConversation';

const UserList = () => {

  const { setSelectedConversation,selectedConversation ,toggleRefreshConversations} = useConversation();

  const [allUsers, loading]= useGetAllUsers();

  
  return (
    <div className='py-4 overflow-y-auto max-h-[92dvh]'>
      {loading?
      "Loading ..."
      :
      allUsers.map((us, index)=>
        <User key={index} conversation={us}/>
      )
      }

    </div>
  );
};

export default UserList