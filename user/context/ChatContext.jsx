import { createContext, useContext, useEffect, useState } from "react";
import {AuthContext} from '../context/AuthContext'
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({children}) =>{

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});
    
    const {socket, axios} = useContext(AuthContext);

    //get all users
    const getUser = async() =>{
        try {
           const {data} =  await axios.get("/api/messages/users");
           if(data.success){
            setUsers(data.users)
            setUnseenMessages(data.unseenMessages);
           }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //get selected user
    const getMessages = async(userId) =>{
      try {
        const {data} = await axios.get(`/api/messages/${userId}`);
        if(data.success){
            setMessages(data.messages);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    //send messages for selected user
    const sendMessage = async(messageData)=>{
      try {
        const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`,messageData);
        if(data.success){
            setMessages((preMessages)=>[...preMessages,data.newMessage])
        }else{
            toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    // function to add suscribe 
    const suscribeMessages = async() =>{
        if(!socket)return;

        socket.on("newMessage",(newMessage)=>{
           if(selectedUser && newMessage.senderId === selectedUser._id){
            newMessage.seen = true;
            setMessages((preMessages)=> [...preMessages,newMessage]);
            axios.put(`/api/messages/mark/${newMessage._id}`)
           }else{
            setUnseenMessages((preUnseenMessages)=>({
             ...preUnseenMessages, [newMessage.senderId] : preUnseenMessages[newMessage.senderId] ? preUnseenMessages[newMessage.senderId]+1 : 1
            }))
           }
        })
    }

    // unsuscribe the messages
    const unsuscribeMessage = () =>{
        if(socket) socket.off("newMessage");
    }

    useEffect(()=>{
    suscribeMessages();
    return ()=> unsuscribeMessage();
    },[socket, selectedUser])


    const value ={
     messages,
     users,
     selectedUser,
     getUser,
     getMessages,
     sendMessage,
     setSelectedUser,
     unseenMessages,
     setUnseenMessages
    }
   return (
   <ChatContext.Provider value={value}>
{children}
   </ChatContext.Provider>
   )
} 