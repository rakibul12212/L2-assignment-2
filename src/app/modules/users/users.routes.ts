import express from "express";
import { UserControllers } from "./users.controller";

const router =express.Router()
//will call controller function
router.post('/create-user',UserControllers.createUser)
router.get('/',UserControllers.getAllUsers)

export const UserRoutes = router;
