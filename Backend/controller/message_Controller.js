import User from "../Models/user_model.js";
import Message from "../Models/message_model.js";
import cloudinary from '../lib/cloundnary.js';
import { io,userSocketMap } from "../server.js";

//Get all users expect the Logged in user
export const getUserForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    //Count messages not seen
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);
    res.json({ success: true, users: filteredUsers, unseenMessages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// get all message of selected user
export const getMessages = async (req, res) => {
  try {
    const selectedUserId = req.params.id;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });
    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );
    res.json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//mark message to seen
export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//send messages to selected user
export const sendMessage = async (req, res) => {
  try {
    const{text , image} = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;
    let imageUrl;
    if(image){
      const uploadRes = await cloudinary.uploader.upload(image)
      imageUrl= uploadRes.secure_url;
    }
    const newMessage = await Message.create({
        senderId,
        receiverId,
        text,
        image:imageUrl
    })
    //emit new message 
    const receiverSocketId = userSocketMap[receiverId];
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage" , newMessage);
    }
    res.json({success:true, newMessage});
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
