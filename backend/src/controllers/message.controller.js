import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io , getReceiverSocketId } from "../lib/socket.js"; 


export const getUsersForSidebar = async (req,res) => {

try{

    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({_id: {$ne: loggedInUserId}});  //not equal to loggedInUserId
    res.status(200).json(filteredUsers);

}catch(error){
    console.error("Error in getUsersForSidebar: " , error.message);
    res.status(500).json({error: "Internal Server error"});
}

}




export const getMessages = async (req,res) => {
    try {
        const {id:userToChatId} =req.params   // It represents the user you’re chatting with
        const myId = req.user._id;

//or is used to match documents that satisfy at least one of several conditions.

        const message = await Message.find({
            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId}
            ]
        })

        res.status(200).json(message);
    } catch (error) {
        console.log("Error in getMessages controller:" , error.message);
        res.status(500).json({error: "Internal Server error"});
    }
};                   


export const sendMessage = async (req,res) => {
    try {
        const {text, image} = req.body;  // passed as messageData in frontEnd
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {

            //Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        res.status(200).json(newMessage);


        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        // realtime with socket.io 


    } catch (error) {
        console.log("Error in sendMessage controller:" , error.message);
        res.status(500).json({error: "Internal Server error"});
    }
}