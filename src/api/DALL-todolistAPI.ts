import axios from "axios";
import {removeTasksTC} from "../state/tasks-reducer";

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'e680b8bb-76ea-445a-a706-2c9170f0614d'
    }
})




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


    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
    },
    removeTasks(todolistId: string, taskId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },

    addTasks(todolistId: string,title: string) {
        return instance.post<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`,{
            title
        });
    },

}









export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}






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



export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
