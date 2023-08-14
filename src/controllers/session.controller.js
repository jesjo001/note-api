import { createAccessToken, createSession, findSessions, updateSessions } from "../services/sessions/sessions.service";
import { validateWithPassword } from "../services/users/user.service";
import { get } from 'lodash';
import { sign } from "../utils/jwt.utils";
import { config } from "dotenv";

config();

export async function createUserSessionHandler(req, res, next) {

   try {
    const body = get(req, 'body');
    const {email, password} = body
    const user = await validateWithPassword( email, password);
    if(!user)return res.status(401).json({ message: "Invalid username or password"})

    const session = await createSession(
        user._id,
        req.get("user-agent") || ""
    )

    const accessToken = createAccessToken({user, session});

    const refreshToken = sign(
        { ...user, session: session._id }, {
        expiresIn: process.env.refreshTokenTtl
    })

  return res.send({ accessToken, refreshToken });
    
   } catch (error) {
        console.error(error);
        return res.send({ error: "Invalid username or password" });
   }

}
export async function invalidateUserSessionHandler(
    req ,
    res
  ) {
    const sessionId = get(req, "user.session");
  
    log.info(sessionId);
  
    await updateSessions({ _id: sessionId }, { valid: false });
  
    return res.sendStatus(200);
  }
  
  export async function getUserSessionsHandler(req , res ) {
    const userId = get(req, "user._id");
  
    const sessions = await findSessions({ user: userId, valid: true });
  
    return res.send(sessions);
  }
  