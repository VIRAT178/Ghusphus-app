import React, { useContext, useEffect, useState } from "react";
import assets, { imagesDummyData } from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
const RightSidebar = () => {
  const {selectedUser, messages} = useContext(ChatContext)
  const {logout, onlineUsers} = useContext(AuthContext);
  const [msgImage, setMsgImage] = useState([]);

  useEffect(()=>{
    setMsgImage(
      messages.filter(msg => msg.image).map(msg=>msg.image)
    )
  },[messages])
  return (
    selectedUser && (
      <div
        className={`bg-[#2a2a3d] h-full p-5 rounded-l-xl overflow-y-scroll text-white shadow-[0_0_20px_rgba(129,133,178,0.2)] transition-all duration-300 ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        {/* Profile Section */}
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="Profile"
            className="w-20 aspect-square rounded-full transition-transform duration-300 hover:scale-[1.05]"
          />
          <h1 className="text-xl font-medium flex items-center gap-2">
            {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
            {selectedUser.fullName}
          </h1>
          <p className="text-center text-gray-300">{selectedUser.bio}</p>
        </div>

        <hr className="border-[#ffffff30] my-4" />

        {/* Media Section */}
        <div className="px-3 text-xs">
          <p className="text-teal-300 mb-2">Media</p>
          <div className="grid grid-cols-2 gap-4 max-h-[200px] overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-transparent">
            {msgImage.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded-md hover:scale-[1.05] transition-transform duration-200 shadow-md"
              >
                <img src={url} alt="" className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="w-full flex justify-center">
          <button onClick={()=>logout()} className="absolute bottom-5 bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-20 rounded-full cursor-pointer hover:scale-[1.03] transition-all duration-300">
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default RightSidebar;
