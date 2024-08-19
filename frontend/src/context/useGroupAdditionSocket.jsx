import React, { useEffect } from 'react';
import { useSocketContext } from './socketContext';
import { useConversation } from '../zustand/useConversation';

function useGroupAdditionSocket() {
  const { socket } = useSocketContext();
  const { toggleRefreshConversations } = useConversation();

  useEffect(() => {
    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    socket.on('addedToGroup', (newGroup) => {
      // Refresh the conversation list to include the new group
      toggleRefreshConversations();

      // Optionally show an alert or notification
      alert(`You've been added to a new group: ${newGroup.groupName}`);
    });

    return () => {
      if (socket) {
        socket.off('addedToGroup');
      }
    };
  }, [socket, toggleRefreshConversations]);
}

export default useGroupAdditionSocket;
