import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';

function useGetAllUsers() {
  const [allusers,SetAllUsers]= useState([]);
  const [loading, setLoading]= useState(false)
  useEffect(()=>{

    const getAllUsers= async()=>{
        setLoading(true)
        try {
          const token = Cookies.get("jwtChatApp");
          const response = await axios.get(`/api/v2/group/getAllConversations`
        );

          if(response){
            SetAllUsers(response.data.conversations)
          }
          setLoading(false)


        } catch (error) {
          console.log("Error in context sdas get all users", error);
        }
      }

      getAllUsers()
    
  },[])
  return [allusers, loading]
}

export default useGetAllUsers