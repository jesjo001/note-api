import { createTodo, deleteTodo, findAllTodo, findTodo, updateTodo } from "../services/todos/todo.service"
import  { get } from "lodash"

export const createTodoHandler = async (req, res, next ) =>{

    try {
        const body = get(req, "body")
        const user = get(req, "user")

        const todo = await createTodo({...body, owner: user._id})

        if(!todo) return res.status(500).json({
            message: "Ops something went wrong!! Todo not created"
        })

        return res.status(200).json({
            message: "Todo created successfully",
            todo
        })

    } catch (error) {
        console.log("error >> ", error)
        return res.status(500).json({
            message: "Ops something went wrong. Server Error!!!"
        })
    }
}


export const getSingleTodoHandler = async (req, res, next ) =>{

    try {
        const todoId = get(req, "params.id")
        const user = get(req, "user")

        const todo = await findTodo({ _id: todoId })

        if(!todo) return res.status(404).json({
            message: `Todo with id of ${todoId} does not exist`
        })

        if(String(todo._id) !== String(user._id) && todo.isPrivate) 
        return res.status(401).json({
            message: "You do not have the required permission to access this resource.",
            todo
        })


        return res.status(200).json({
            message: "Resource successfully optianed",
            todo
        })

    } catch (error) {
        console.log("error >> ", error)
        return res.status(500).json({
            message: "Ops something went wrong. Server Error!!!"
        })
    }
}


export const getPublicTodosHandler = async(req, res, next ) =>{

    try {
        const user = get(req, "user")

        console.log(user)
        const todo = await findAllTodo({ $or : [ {isPrivate: false}, { owner: user._id, isPrivate: true }] })
        
        if(!todo) return res.status(500).json({
            message: `Ops something went wrong`
        })
       
        return res.status(200).json({
            message: "Resource successfully optianed",
            todos: todo
        })

    } catch (error) {
        console.log("error >> ", error)
        return res.status(500).json({
            message: "Ops something went wrong. Server Error!!!"
        })
    }
}

export const updateTodoHandler = async (req, res, next ) =>{

    try {
        const todoId = get(req, "params.id")
        const body = get(req, "body")
        const user = get(req, "user")

        const todo = await findTodo({_id: todoId, owner: user._id})
        
        if(!todo) return res.status(401).json({
            message: "Ops looks like you dont have the right priviledge to update Todo"
        })

        const updatedTodo = await updateTodo({_id: todoId, owner: user._id}, { ...body}, { new: true})

        return res.status(200).json({
            message: "Todo updated successfully",
            updatedTodo
        })

    } catch (error) {
        console.log("error >> ", error)
        return res.status(500).json({
            message: "Ops something went wrong. Server Error!!!"
        })
    }
}

export const deleteeTodoHandler = async (req, res, next ) =>{

    try {
        const body = get(req, "params.id")
        const user = get(req, "user")

        const todo = await findTodo({ owner: user._id})

        if(!todo) return res.status(500).json({
            message: "Ops you are not authorized to delete this Todo"
        })

        const deleted = await deleteTodo({owner: user._id}, {new : true})


        return res.status(200).json({
            message: "Todo deleted successfully",
            deleted
        })

    } catch (error) {
        console.log("error >> ", error)
        return res.status(500).json({
            message: "Ops something went wrong. Server Error!!!"
        })
    }
}
