import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    userName: {
        type: String, 
        require: true,
        unique: true,
        min: 5, 
        max: 50 
    }, 
    email: {
        type: String, 
        unique: true, 
        require: true
    }, 
    password: {
        type: String, 
        require: true,
        min: 5
    },
},{timestamps: true})

const User = mongoose.model("User", UserSchema);
export default User; 