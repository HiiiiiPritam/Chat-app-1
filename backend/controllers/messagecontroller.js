import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Messages.js";
import { getReceiverSocketId, io } from "../SocletIo/server.js";


export const sendMessage = async (req, res) => {
  const { message} = req.body;
  const {id:receiverId}= req.params ;
  const senderId= req.user._id;

  try {
    
    let conversation = await Conversation.findOne({
      members:{$all:[senderId,receiverId]}
    })

    if(!conversation){
      conversation = await Conversation.create({
        members:[senderId,receiverId]
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    })

    // await newMessage.save()

    if(newMessage){
      conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(),newMessage.save()])

    const receiverSocketId = getReceiverSocketId(receiverId)

    if(receiverId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    res.status(200).json({ message: "message send successful",newMessage});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessage = async (req, res) => {
  
  const {id:receiverId}= req.params ;
  const senderId= req.user._id;

  try {
    
    let conversation = await Conversation.findOne({
      members:{$all:[senderId,receiverId]}
    }).populate("messages")

    if(!conversation){
      return res.status(200).json([]);
    }

    const messages = conversation.messages

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};












/////////////group message///////

export const sendMessage2 = async (req, res) => {
  const { conversationId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id;

  try {
    // Check if the conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Create and save the new message
    const newMessage = new Message({
      conversationId,
      senderId,
      message,
    });

    if(newMessage){
      conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(),newMessage.save()])


    // Emit the new message event to all users in the room (conversation)

    io.to(conversationId).emit("newMessage", newMessage);

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
 
//add to group

export const addMembersToGroup = async (req, res) => {
  const { conversationId, newMembers } = req.body;
  const adminId = req.user._id;

  try {
    // Find the group conversation
    const groupConversation = await Conversation.findById(conversationId);

    if (!groupConversation) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is the admin of the group (Assuming the first member is the admin)
    if (groupConversation.admin.toString() !== adminId.toString()) {
      return res.status(403).json({ message: "Only the admin can add members" });
    }

    // Add new members to the group (ensure no duplicates)
    const updatedMembers = [...new Set([...groupConversation.members, ...newMembers])];

    groupConversation.members = updatedMembers;
    await groupConversation.save();

    // Emit an event to notify new members that they've been added to the group (optional)
    newMembers.forEach(memberId => {
      const memberSocketId = getReceiverSocketId(memberId);
      if (memberSocketId) {
        io.to(memberSocketId).emit("addedToGroup", groupConversation);
      }
    });

    res.status(200).json({ message: "Members added successfully", group: groupConversation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// create group 

export const createGroup = async (req, res) => {
  const { groupName, members } = req.body;
  const adminId = req.user._id;

  try {
    // Ensure the group has a name and at least one member
    if (!groupName || !members || members.length === 0) {
      return res.status(400).json({ message: "Group name and members are required" });
    }

    // Add the admin to the members array if not already included
    const formattedMembers = members.map(member => member.toString());

    // Add the admin to the members array if not already included
    if (!formattedMembers.includes(adminId.toString())) {
      formattedMembers.push(adminId.toString());
    }

    

    // Create the group conversation
    const newGroup = new Conversation({
      groupName,
      members: formattedMembers,
      isGroup: true,
      admin: adminId,
    });

    await newGroup.save();

    // Emit an event to notify members that they've been added to a group (optional)
    formattedMembers.forEach(memberId => {
      const memberSocketId = getReceiverSocketId(memberId);
      if (memberSocketId) {
        io.to(memberSocketId).emit("addedToGroup", newGroup);
      }
    });

    res.status(201).json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

