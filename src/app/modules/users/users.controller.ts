import { Request, Response } from "express";
import { UserServices } from "./users.services";

const createUser = async (req:Request,res:Response)=>{
   try{
    const userData = req.body

    const user =await UserServices.createUserIntoDB(userData);

    res.status(200).json({
        success: true,
        message: "User created successfully!",
        data: user,
      });
   } catch (err) {
    res.status(500).send({
      success: false,
      message: "User not created successfully",
      error: {
        code: 500,
        description: err,
      },
    });
  }
}
export const UserController={
    createUser
}