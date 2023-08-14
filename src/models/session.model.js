import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
},
{ timestamps: true }
)


const Session = mongoose.model('Session', SessionSchema);

export default Session;