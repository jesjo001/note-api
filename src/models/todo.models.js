import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    isPrivate: {
        type:Boolean,
        required: false,
        default: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;