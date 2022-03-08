import React, {useEffect, useState} from 'react'
import {DALLTodolistAPI} from "../api/DALL-todolistAPI";


export default {
    title: 'API'
}



const todolistId = '866f646a-4f27-4d20-920a-e24f4dd9a9ce';
const title = 'XXXXXXXXXXXXXXXXX';


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        DALLTodolistAPI.getTodos()
        .then((res)=>{
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
        DALLTodolistAPI.createTodo(title)
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
        DALLTodolistAPI.deleteTodo(todolistId)
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
     DALLTodolistAPI.updateTodo( {todolistId,title})
        .then(
            (res)=>{
                setState(res.data)
            }
        )


    }, [])

    return <div> {JSON.stringify(state)}</div>
}

