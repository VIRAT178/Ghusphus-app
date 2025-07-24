import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext.jsx'
import { ChatContext } from "../../context/ChatContext.jsx";

const Sidebar = () => {
  const {logout,onlineUsers} = useContext(AuthContext);
  const { getUser, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages} = useContext(ChatContext);
  const [input, setInput] = useState(false);
  const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())):users;
  useEffect(()=>{
   getUser();
  },[onlineUsers])
  const navigate = useNavigate();


  return (
    <div className="bg-[#2a2a3d] h-full p-5 rounded-r-xl overflow-y-scroll text-white shadow-[0_0_20px_rgba(129,133,178,0.2)] transition-all duration-300">

      <div className="flex justify-between items-center pb-5">
        <img src={assets.logo} alt="logo" className="max-w-30 mix-blend-screen drop-shadow-xl" />
        
        <div className="relative py-2 group">
          <img
            src={assets.menu_icon}
            alt="menus"
            className="max-h-5 cursor-pointer transition-transform duration-300 hover:scale-110"
          />
          

          <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#2B2B3C] border border-gray-700 text-gray-100 hidden group-hover:block">
            <p
              onClick={() => navigate("/profile")}
              className="cursor-pointer text-sm hover:text-teal-400 transition-colors"
            >
              Edit Profile
            </p>
            <hr className="my-2 border-gray-600" />
            <p className="cursor-pointer text-sm hover:text-red-400 transition-colors "onClick={()=>logout()}>
              Logout
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#3a3a4d]/40 rounded-full flex items-center gap-2 py-3 px-4 mt-5">
        <img src={assets.search_icon} alt="Search" className="w-3" />
        <input
          type="text"
          onChange={(e)=>setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-white text-xs placeholder-gray-400 flex-1 focus:placeholder-teal-300"
          placeholder="Search User.."
        />
      </div>

      <div className="flex flex-col mt-5">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            onClick={() => {setSelectedUser(user); setUnseenMessages(prev=>({...prev,[user._id]:0}))}}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer transition-all duration-200 hover:bg-[#3a3a4d]/60 hover:scale-[1.02] ${
              selectedUser?._id === user._id && "bg-[#3a3a4d]/40 shadow-inner"
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              className="w-[35px] aspect-[1/1] rounded-full"
              alt={user.fullName}
            />

            <div className="flex flex-col leading-5">
              <p className="text-sm">{user.fullName}</p>
              <span
                className={`text-xs ${
                  onlineUsers.includes(user._id)  ? "text-teal-400 user-status online" : "text-gray-500"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </span>
            </div>

            {unseenMessages[user._id]>0 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-pink-500/40">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
