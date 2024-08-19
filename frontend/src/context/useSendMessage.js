import React, { useEffect, useState } from "react";
import { useConversation } from "../zustand/useConversation.js";
import axios from 'axios'

function useSendMessage() {
  const [loading, setLoading] = useState();
  const { messages, setMessage, selectedConversation } = useConversation();
  
 
    const sendMesages = async (message) => {
      
      if (selectedConversation && selectedConversation._id) {
        setLoading(true);
        try {
          const response = await axios.post(
            `/api/v2/group/send2/${selectedConversation._id}`,{message}
          );
          console.log(response.data);
          
          setMessage([...messages,response.data.newMessage])
          setLoading(false);
        } catch (error) {
          console.log("Error in context post messages", error);
        }
      }
    };
  

  return {loading, sendMesages};
}

export default useSendMessage;
