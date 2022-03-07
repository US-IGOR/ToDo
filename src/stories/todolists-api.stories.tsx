import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {settings, todolistApi} from "../api/todolistAPI";

export default {
    title: 'API'
}



const todolistId = 'ab66c366-1cc4-43cd-8288-f701238aa2d2';
const title = '!!!!!!!!!!!!!!!!!!!!!';


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
        .then((res:any)=>{
                setState(res.data);
            }
        )
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodo(title)
        .then(
            (res)=>{
                setState(res.data)
            }
        )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.deleteTodo(todolistId)
        .then(
                (res)=>{
                    setState(res.data)
                }
            )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
     todolistApi.updateTodo(todolistId,title)
        .then(
            (res)=>{
                setState(res.data)
            }
        )


    }, [])

    return <div> {JSON.stringify(state)}</div>
}

