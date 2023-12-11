
import { Request, Response } from "express";
import { UserServices } from "./users.service";

const createUser =async (req:Request,res:Response)=>{
  try{
    const {user:userData} =req.body

    //will cal service function to send data
    const data =await UserServices.createUserIntoDB(userData)

    //send res
    res.status(200).json({
        success:true,
        massage:'user is created successfully',
        data:data,
    })
  }catch(err){
    console.log(err)
  }

}

const getAllUsers = async (req:Request,res:Response)=>{
  try{
  
    //will cal service function to send data
    const data =await UserServices.getAllUsersFromDB()
   //send res
   res.status(200).json({
    success:true,
    massage:'users are retrive successfully',
    data:data,
})
  }catch(err){
    console.log(err)
  }
} 

export const UserControllers ={
    createUser,getAllUsers,
}