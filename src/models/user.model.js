import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname:{
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        
    },
    token: {
        type: String,
        required: false,
    }
}, { timestamps: true});

userSchema.pre("save", async function (next) {
    let user = this;
  
    //only hash the password if it has been modified or new
    if (!user.isModified("password")) return next();
  
    //get salt
    const salt = await bcrypt.genSalt(parseInt(process.env.saltWorkFactor));
    // const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
  
    const hash = await bcrypt.hashSync(user.password, salt);
  
    // Replace the password with the hash
    user.password = hash;
  
    return next();
  });
  
  //Used for logging in users
  userSchema.methods.comparePassword = async function (
    candidatePasswords
  ) {
    const user = this;
  
    return bcrypt.compare(candidatePasswords, user.password).catch((e) => false);
  };

const User = mongoose.model('User', userSchema);
export default User;