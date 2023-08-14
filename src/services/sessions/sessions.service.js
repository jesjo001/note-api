import Session from "../../models/session.model";
import { sign } from "../../utils/jwt.utils";
import { config } from "dotenv";

config();

export async function createSession( userId, userAgent){
    const session = await Session.create({ user: userId, userAgent });
    return session.toJSON();
}

export function createAccessToken({ user, session }){
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: process.env.refreshTokenTtl } // 15 minutes
  );

  return accessToken;
}

export async function reIssueAccessToken({
    refreshToken,
    }) {
    // Decode the refresh token
    const { decoded } = decode(refreshToken);
    
    if (!decoded || !decoded.session) return false;
    
    // Get the session
    const session = await Session.findById(decoded.session);
    
    // Make sure the session is still valid
    if (!session || !session.valid) return false;
    
    const user = await User.findById(session.user);
    if (!user) return false;
    
    const accessToken = createAccessToken({ user, session });
    
    return accessToken;
}

export async function findSessions(sessionQuery) {
    return await Session.find(sessionQuery).lean();
}

export async function updateSessions(sessionQuery){
    return await Session.update(sessionQuery);
}