import { Conversation } from "../../models/Conversation.js";
import { Message } from "../../models/Messages.js";
import { User } from "../../models/Users.js";

export const startConversation = async (req, res) => {
  const { userId } = req.body;
  const currentUserId = req.user._id;

  try {
    // Check if a conversation already exists between the two users
    let conversation = await Conversation.findOne({
      members: { $all: [currentUserId, userId], $size: 2 }
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = new Conversation({
        members: [currentUserId, userId],
      });
      await conversation.save();
    }

    // Populate the members and filter out the current user from the members array
    await conversation.populate("members");
    const filteredMembers = conversation.members.filter(member => member._id.toString() !== currentUserId.toString());

    // Send the conversation data with filtered members
    res.status(200).json({ 
      conversation: {
        ...conversation.toObject(),
        members: filteredMembers
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
