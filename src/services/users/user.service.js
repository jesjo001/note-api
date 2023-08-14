
import User from "../../models/user.model";
import { omit } from "lodash";

export const createUser = async (body) => {
    return await User.create(body);
}

export const findOneAndUpdate = async (query, update, options = {}) => {
    return User.findOneAndUpdate(query, update, options);
}


export const findUser = async (query, options = {}) => {
    return User.findOne(query,options);
}

export const validateWithPassword = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user) return false;

    const isValid = user.comparePassword(password);

    if(!isValid) return false;

    delete user.password
    return omit(user.toJSON(), "password")

}