import mongoose, { Schema } from "mongoose"


const conversationSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    groupName: {
      type: String,
      default: null, // If null, it's a one-on-one chat, otherwise, it's a group chat
    },
    isGroup: {
      type: Boolean,
      default: false, // False for one-on-one, true for group chat
    },
    admin:{
      type:Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
);

export const Conversation = mongoose.model('Conversation', conversationSchema);


