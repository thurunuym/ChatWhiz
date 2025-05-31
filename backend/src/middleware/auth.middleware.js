import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req , res , next) => {
    try{
        const token = req.cookies.jwt;
        //Checks for a JWT in the jwt cookie of the incoming request.


        if(!token){
            return res.status(401).json({message: "Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        //Uses the userId from the decoded JWT to find the user in MongoDB.
        //Excludes the password field for security (select("-password")).

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user
        //If a user was found, this line attaches the user object to the req (request) object, so that the next middleware or route handler can access it.

        next()
        //next is the next function in route

        //The req object is passed through the entire middleware and route handler chain for a single request.
        //Attaching user to req (e.g., req.user = user;) allows all subsequent middleware and route handlers to access the authenticated user information for that request

    }catch(error){
        console.log("Error in protectRoute middleware:",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};                  