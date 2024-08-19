import React, { useEffect, useState } from "react";
import { useConversation } from "../zustand/useConversation.js";
import axios from 'axios'

function useGetMessage() {
  const [loading, setLoading] = useState();
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMesage = async () => {
      
      if (selectedConversation && selectedConversation._id) {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/v2/group/getConversationMessages/${selectedConversation._id}`
          );

          setMessage(response.data)
          setLoading(false);
        } catch (error) {
          console.log("Error in context get selected conversation", error);
        }
      }
    };

    getMesage();
  }, [selectedConversation, setMessage]);

  return {loading, messages};
}

export default useGetMessage;
