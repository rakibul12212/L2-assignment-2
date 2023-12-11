import { User } from './users.inteface';
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

export const UserControllers ={
    createUser
}