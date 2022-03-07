import axios from "axios";


const baseURL = 'https://social-network.samuraijs.com/api/1.1'



export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b3a9a9e4-0bf1-4009-8ba9-a298b1b9d232'
    }

}



export const todolistApi = {
    getTodos() {
        let promise=axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',
            settings)
        return promise
    },

    createTodo (title:string) {
        let promise= axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{
          title
        },settings)
        return promise
    },
    deleteTodo (todolistId:string) {
        let promise= axios.delete(`${baseURL}/todo-lists/${todolistId}`,settings)
        return promise
    },
    updateTodo (todolistId:string,title:string) {
        let promise= axios.put(`${baseURL}/todo-lists/${todolistId}`,{title: title},settings)
        return promise
    },

}

