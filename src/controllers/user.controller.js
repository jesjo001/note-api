import { createUser, findUser } from "../services/users/user.service";
import { get, omit } from "lodash"

export const createUserHandler = async (req, res, next) => {
    try {
        const userEmail = get(req, "body.email")

        const userExist = await findUser( { email: userEmail } );
        
        if(userExist) return res.status(409).json({
            message: "User already exists"
        })

        const user = await createUser({...req.body});

        
        return res.status(201).json({
            message: "User created successfully",
            data: omit(user.toJSON(), "password"),
        })
        
    } catch (error) {
        res.status(500).json({ message: "Ops something went wrong" })
        next(error);
    }
}

export const getUserHandler = async (req, res, next) => { 
    try {
        const userId = get(req, "params.id")
        const user = await findUser({ _id: userId });
        if(!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: "Ops something went wrong" })
        next(error);
    }
}