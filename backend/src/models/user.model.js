import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type:String,
            required: true,
            unique: true,
        },

        fullName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        profilePic: {
            type: String,
            default: ""
        },
    },

{timestamps: true}
);

const User = mongoose.model("User", userSchema);
//Mongoose automatically pluralizes and lowercases this name to create the actual collection name in MongoDB.

export default User;                    