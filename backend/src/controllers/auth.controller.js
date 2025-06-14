import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js"; // Adjust path if needed
import cloudinary from "../lib/cloudinary.js";


export const signup =async (req , res) => {
    const { email, fullName, password } = req.body
    try{

        if(!email || !fullName || !password){
            return res.status(400).json({message: "All fields are required"}); } 

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }   

        const user = await User.findOne({email})

        if(user) return res.status(400).json({message: "Email already exists" })
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            fullName,
            password: hashedPassword
        })

//A salt is a random string that is added to a password before it is hashed.
//Its purpose is to make each password hash unique, even if two users have the same password.

        if(newUser){
            //jwt
            await newUser.save();
            generateToken(newUser._id, res);
                        
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            });
        } else{
            res.status(400).json({message: "invalid user data"});
        }

    }catch(error){
        console.log("Error during signup:", error);
        res.status(500).json({message: "Internal server error"});
    };
}

export const login = async (req , res) => {
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})  
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message: "invalid password"});
        }

        generateToken(user._id,res)

        res.status(200).json({
            _id: user.id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })

    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const logout = (req , res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        //Clears the JWT cookie by setting maxAge: 0

        res.status(200).json({message:"Logged out successfully"});
    }catch(error){
        console.log("error in logout controller",error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}; 

export const updateProfile = async(req,res) =>{
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;
//? explain
        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser= await User.findByIdAndUpdate(userId, 
            {profilePic:uploadResponse.secure_url} , 
            {new:true})

        res.status(200).json(updatedUser);
    }catch(error){
        console.log("error in update profile:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

//By default, Mongoose returns the original document (the one before the update) when you use findByIdAndUpdate or similar methods.
//Without { new: true }:
//updatedUser will be the user document as it was before the update.

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }

}

// the authenticated user object is attached to the req object, 
// and then your endpoint simply returns that user object with a 
// 200 status if authentication was successful.