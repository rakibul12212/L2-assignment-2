
import { Request, Response } from "express";
import { UserServices } from "./users.service";
import userValidationSchema from "./users.zodValidation";
//create data
const createUser =async (req:Request,res:Response)=>{
  try{
    const {user:userData} =req.body;
    const validateUser =userValidationSchema.parse(userData)
    
    //will cal service function to send data
    const data =await UserServices.createUserIntoDB(validateUser)

    //send res
    res.status(200).json({
        success:true,
        massage:'user is created successfully',
        data:data,
    })
  }catch(err:any){
    res.status(500).json({
      success:false,
      massage: err.massage || 'something went wrong',
      error:err,
  })
  }
};


//get all user
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
  }catch (err) {
    res.status(500).send({
      success: false,
      message: "User not found!",
      error: {
        code: 500,
        description: "User not found!",
      },
    });
  }
};



//get single user
const getSingleUser = async (req:Request,res:Response)=>{
  try{
    const{ userId }= req.params
  
    //will cal service function to send data
    const data =await UserServices.getSingleUserFromDB(userId)
    
   //send res
   res.status(200).json({
    success:true,
    massage:'user is retrive successfully',
    data:data,
})
  }catch(err){
    res.status(500).json({
      success:false,
      massage:'something went wrong',
      error:err,
  })
  }
}


export const UserControllers ={
    createUser,getAllUsers,getSingleUser,
}