import { genrateToken } from "../lib/utils.js";
import User from "../Models/user_model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloundnary.js";
// SignUp new user
export const Signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = genrateToken(newUser._id);
    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account Created Sccuessfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = genrateToken(userData._id);
    res.json({ success: true, userData, token, message: "Login Sccuessfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
 
//controller to check the user is authenticated
export const checkAuth = (req,res) =>{
    res.json({success:true, user : req.user});
}

//controller to update user details
export const updateProfile = async (req , res) =>{
    try {
        const {profilePic, bio , fullName } = req.body;
        const userId = req.user._id;
        let updatedUser ;
        if(!profilePic){
           updatedUser= await User.findById(userId, {bio,fullName}, {new:true})
        }else{
            const upload = await cloudinary.uploader.upload(profilePic,{
                upload_preset: 'ghusphus_unsigned'
            });
            updatedUser = await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url, bio, fullName},{new:true})
        }
        res.json({success:true , user: updatedUser})
    } catch (error) {
        console.log(error.message);
         res.json({success:false , message:error.message});
    }
}