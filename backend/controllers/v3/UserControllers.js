import { Conversation } from "../../models/Conversation.js";
import { Message } from "../../models/Messages.js";
import { User } from "../../models/Users.js";


export const getAllUsers = async (req, res) => {
  const userId = req.user._id;

  try {
    // Find all users except the current user
    const users = await User.find({ _id: { $ne: userId } });

    // Format the user data
    

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
