import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Messages.js";
import { getReceiverSocketId, io } from "../SocletIo/server.js";

export const getAllConversations = async (req, res) => {
  const userId = req.user._id;

  try {
    // Find all conversations where the user is a member
    const conversations = await Conversation.find({ members: userId })
      .populate("members"); // This should populate the members with user data

    // Log the conversations to check if the members are populated

    // Format the conversations for the frontend
    const formattedConversations = conversations.map(conversation => {
      let displayName;
      let email;

      if (conversation.isGroup) {
        displayName = conversation.groupName;
        email = "Group";
      } else {
        // Get the other user's name (not the current user)
        const otherUser = conversation.members.find(member => member._id.toString() !== userId.toString());
        displayName = otherUser ? otherUser.fullname : "Self";
        email = otherUser ? otherUser.email : "Self Email";
      }

      // Log the members array to ensure it's correctly 

      // Filter out the current user from the members list
      const membersList = conversation.members.filter(member => member._id.toString() !== userId.toString());

      return {
        _id: conversation._id,
        fullname: displayName,
        isGroup: conversation.isGroup,
        email,
        members: membersList // This should now return all members except the current user
      };
    });

    res.status(200).json({ conversations: formattedConversations });
  } catch (error) {
    console.error("Error in getAllConversations:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getConvoMessage = async (req, res) => {
  const { conversationId } = req.params;

  if (!conversationId) {
    return res.status(400).json({ message: "Conversation id not provided" });
  }

  try {
    // Find the conversation and populate messages along with senderId
    const conversation = await Conversation.findOne({ _id: conversationId })
      .populate({
        path: 'messages',
        populate: {
          path: 'senderId',
          select: 'fullname'
        }
      });

    if (!conversation) {
      return res.status(200).json([]);
    }

    // Map the messages to include the sender's full name
    const messages = conversation.messages.map(message => ({
      _id: message._id,
      senderId: message.senderId._id,
      conversationId: message.conversationId,
      message: message.message,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      fullname: message.senderId.fullname // Include sender's full name
    }));

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



