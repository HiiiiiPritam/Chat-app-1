import { useConversation } from "../zustand/useConversation";

import { useEffect } from "react";
import { useSocketContext } from "./socketContext";

function useJoinRoom() {
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    if (selectedConversation) {
      const { _id: conversationId, members } = selectedConversation;
      // Join the room for this conversation
      socket.emit('joinRoom', { conversationId, members });
    }

    return () => {
      if (selectedConversation) {
        const { _id: conversationId } = selectedConversation;
        // Leave the room for this conversation
        socket.emit('leaveRoom', { conversationId });
      }
    };
  }, [selectedConversation, socket]);
}

export default useJoinRoom;
