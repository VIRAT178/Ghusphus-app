import React, { useContext, useState } from "react";
import BubbleBackground from "../components/BubbleBackground";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
   const { authUser , updateProflie} = useContext(AuthContext)

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedImage){
      await updateProflie({fullName:name, bio});
       navigate("/");
       return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async()=>{
      const base64Image = reader.result;
      await updateProflie({profilePic :  base64Image, fullName: name,bio})
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#23232f] to-[#2a2a3d] text-white overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <BubbleBackground />

      {/* Glassmorphic Profile Card */}
      <div className="w-5/6 max-w-2xl backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(129,133,178,0.2)] transition-all duration-300 flex items-center justify-between max-sm:flex-col-reverse py-10 px-6">
        
        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
          <h3 className="text-lg font-semibold text-gray-100">Profile Details</h3>

          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-teal-300 transition-colors">
            <input
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon}
              alt="avatar"
              className={`w-12 h-12 ${selectedImage && "rounded-full"} transition-transform duration-300 hover:scale-[1.05]`}
            />
            Upload Profile Image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-500 rounded-md bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            rows={4}
            className="p-2 border border-gray-500 rounded-md bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer hover:scale-[1.03] transition-all duration-300"
          >
            Save
          </button>
        </form>

        {/* Logo Area */}
        <img
          src={ authUser.profilePic||assets.logo_icon}
          alt="App Logo"
          className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 transition-transform duration-300 hover:scale-[1.05] ${selectedImage && 'rounded-full'}`}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
