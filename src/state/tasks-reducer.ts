import {AddTodolistACType, GetToDosACType, RemoveTodolistACType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {DALLTodolistAPI} from "../api/DALL-todolistAPI";
import {AppRootState} from "./store";


type ActionsType = addNewTaskACType |
    removeTaskACType |
    ChangeTaskStatusActionType |
    changeTitleTaskACType |
    AddTodolistACType |
    RemoveTodolistACType |
    GetToDosACType |
    setTaskACType

type addNewTaskACType = ReturnType<typeof addNewTaskAC>;
type removeTaskACType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type changeStatusACType = {
    type: 'CHANGE-STATUS'
    taskId: string,
    isDone: boolean,
    todolistId: string

}
type changeTitleTaskACType = {
    type: 'CHANGE-TITLE-TASK',
    taskId: string,
    title: string,
    todolistId: string
}
type setTaskACType = ReturnType<typeof setTaskAC>
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

const innitialState: TasksStateType = {

    //  'todoid1':[],
    //  'todoid2':[],
    //  'todoid3':[],


    /*    [todolistID_1]: [
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'ts', isDone: false},
            {id: v1(), title: 'js', isDone: true}
        ],
        [todolistID_2]: [
            {id: v1(), title: 'bear', isDone: true},
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'water', isDone: true}
        ]*/
}

export const tasksReducer = (state: TasksStateType = innitialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case 'GET-TODOS': {

            const stateCopy = {...state}
            action.todolists.forEach((t) => {
                stateCopy[t.id] = []
            })

            return stateCopy


        }
        case 'ADD-NEW-TASK': {

            debugger
            const stateCopy = {...state};
            const tasks = stateCopy[action.task.todoListId]
            const newTask = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTask
            return stateCopy
        }
        case 'REMOVE-TASK': {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }

        case 'CHANGE-TITLE-TASK' : {
            {
                let todolistTasks = state [action.todolistId]
                state [action.todolistId] = todolistTasks.map(m => m.id === action.taskId
                    ? {...m, title: action.title}
                    : m)
            }
            return {...state}
        }
        case 'ADD-TODOLIST' : {
            {
                const stateCopy = {...state}
                stateCopy[action.todolistId] = [];


                return stateCopy
            }
        }


        case 'REMOVE-TODOLIST'        : {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state};
            stateCopy[action.todoId] = action.tasks
            return stateCopy
        }

        default:
            return state;
    }

}

export const addNewTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-NEW-TASK',
        task
    } as const
}
export const removeTaskAC = (taskId: string, todoListId: string): removeTaskACType => {
    return {
        type: 'REMOVE-TASK', taskId: taskId, todolistId: todoListId
    }
}
/*export const changeStatusAC = (idTask: string, isDone: boolean, todolistId: string): changeStatusACType => {
    return {
        type: 'CHANGE-STATUS',
        taskId: idTask,
        isDone,
        todolistId
    }
}*/

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}

export const changeTitleTaskAC = (taskId: string, title: string, todolistId: string): changeTitleTaskACType => {
    return {
        type: 'CHANGE-TITLE-TASK',
        taskId,
        title,
        todolistId
    }
}
export const setTaskAC = (todoId: string, tasks: Array<any>) => {
    return {
        type: 'SET-TASKS',
        todoId,
        tasks,
    } as const
}

export const getTasksTC = (todoId: string) => {
    return (dispatch: Dispatch) => {
        DALLTodolistAPI.getTasks(todoId)
            .then((res) => {
                dispatch(setTaskAC(todoId, res.data.items))
            })
    }
}

export const removeTasksTC = (taskId: string, todoId: string) => {
    return (dispatch: Dispatch) => {
        DALLTodolistAPI.removeTasks(todoId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todoId))
            })
    }
}


export const addTasksTC = (todoId: string, title: string,) => {
    return (dispatch: Dispatch) => {
        DALLTodolistAPI.addTasks(todoId, title)
            .then((res) => {
                dispatch(addNewTaskAC(res.data.data.item))
            })
    }
}

export const updTaskStatusTC = (id: string, status: TaskStatuses, todoID: string) =>
    (dispatch: Dispatch,getState: ()=>AppRootState) => {

    const allAppState= getState()
    const allTasks = allAppState.tasks
    const tasksForCurrentTodo = allTasks[todoID]
    const currentTask = tasksForCurrentTodo.find ( (t)=> {
        debugger
        return t.id === id
    })


        debugger

    const model:any = {...currentTask, status:status}
    DALLTodolistAPI.updateTask(todoID,id , model)

        // min = 3.56
        .then((res) => {
          dispatch (changeTaskStatusAC(id, status, todoID))
        })

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
export type TasksStateType = {
    [key: string]: Array<TaskType>
}










