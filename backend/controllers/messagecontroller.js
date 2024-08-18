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

    await newMessage.save()

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

