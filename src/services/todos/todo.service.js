import Todo from "../../models/todo.models";


export const createTodo = async (params) =>{
    return Todo.create(params)
}

export const findTodo = async (query) =>{
    return Todo.findOne(query)
}

export const findAllTodo = async (query, options={}) =>{
    return Todo.find(query,options)
}

export const updateTodo = async (query, update, options) =>{
    return Todo.findOneAndUpdate(query, update, options)
}

export const deleteTodo = async (query) =>{
    return Todo.findOneAndDelete(query)
}