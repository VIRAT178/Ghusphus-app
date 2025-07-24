import React, { useContext } from 'react';
import Sidebar from "../components/Sidebar";
import ChatContainer from '../components/ChatContainer';
import RightSidebar from '../components/RightSidebar';
import BubbleBackground from '../components/BubbleBackground';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const {selectedUser} = useContext(ChatContext);

  return (
    <div className="relative w-full h-screen text-white overflow-hidden sm:px-[15%] sm:py-[5%] bg-gradient-to-br from-[#23232f] to-[#2a2a3d]">
      <BubbleBackground />
      <div
        className={`backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative transition-all duration-300 shadow-[0_0_20px_rgba(129,133,178,0.2)] ${
          selectedUser
            ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
            : 'md:grid-cols-2'
        }`}
      >
        <Sidebar  />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
