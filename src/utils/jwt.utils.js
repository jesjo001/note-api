import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import config from "config";
dotenv.config();

const privateKey = process.env.PRIVATEKEY;
// const privateKey = config.get("privateKey") as string;

export function sign(object, options){
    return jwt.sign(object, privateKey, options);
}

export function decode(token) {
  try {

    const decoded = jwt.verify(token, privateKey);
    return { valid: true, expired: false, decoded };

  } catch (error) {
    return {
      valid: false,
      expired: (error).message === "jwt expired",
      decoded: null,
    };
  }
}