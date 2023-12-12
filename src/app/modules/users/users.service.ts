import { TUser } from "./users.inteface";
import {  User } from "./users.model";
import bcrypt from "bcrypt";
import config from "../../config";

//create data
const createUserIntoDB=async (userData:TUser)=>{
    if(await User.isUserExists(userData.userId)){
        throw new Error('user already exists');
     }
     const data=await User.create(userData); //build in static method
    return data;
}

//get all data
const getAllUsersFromDB = async ()=>{
    const data =await User.find();
    return data;
}

//get single user
const getSingleUserFromDB = async (userId:string|number)=>{
    const data =await User.findOne({userId});
    return data;
}

export const UserServices={
    createUserIntoDB,getAllUsersFromDB,getSingleUserFromDB,
}