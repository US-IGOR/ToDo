import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b3a9a9e4-0bf1-4009-8ba9-a298b1b9d232'
    }

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        .then (
            (res)=>{
                setState(res.data);
                debugger
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
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{
            title: "newTodolist"
        },settings).then(
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
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

