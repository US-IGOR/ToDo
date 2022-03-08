import axios from "axios";

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'b3a9a9e4-0bf1-4009-8ba9-a298b1b9d232'
    }
})


type todoType = {
    addedDate: string
    id: string
    order: number
    title: string
}
type baseType <T = {}> = {
    resultCode: number
    messages: string[],
    fieldsErrors:string[],
    data: T
}


export const DALLTodolistAPI = {
    getTodos() {
        return instance.get<Array<todoType>>('/todo-lists')
    },

    createTodo(title: string) {
        return instance.post<baseType<{item: todoType}>>('/todo-lists', {
            title
        })
    },

    deleteTodo(todolistId: string) {
        return instance.delete<baseType>(`/todo-lists/${todolistId}`)
    },

    updateTodo(payload: { todolistId: string, title: string }) {
        return instance.put<baseType>(`/todo-lists/${payload.todolistId}`,
            {title: payload.title})
    },

}



