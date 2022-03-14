import {TasksStateType, todolistsType} from "../App";
import {v1} from "uuid";
import {stat} from "fs";
import {AddTodolistACType, GetToDosACType, RemoveTodolistACType, todolistID_1, todolistID_2} from "./todolists-reducer";
import {Dispatch} from "redux";
import {DALLTodolistAPI} from "../api/DALL-todolistAPI";


type ActionsType = addNewTaskACType |
    removeTaskACType |
    changeStatusACType |
    changeTitleTaskACType |
    AddTodolistACType |
    RemoveTodolistACType|
    GetToDosACType

type addNewTaskACType = {
    type: 'ADD-NEW-TASK',
    title: string,
    todolistId: string
}
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

        case 'GET-TODOS':{

            const stateCopy = {...state}
            action.todolists.forEach ( (t)=> {
              stateCopy[t.id] = []
            }  )

            return stateCopy



        }



        case 'ADD-NEW-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case 'REMOVE-TASK': {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }
        case 'CHANGE-STATUS': {
            {
                let todolistTasks = state [action.todolistId]
                state [action.todolistId] = todolistTasks.map(m => m.id === action.taskId
                    ? {...m, isDone: action.isDone}
                    : m)
            }
            return {...state}
        }

        case
        'CHANGE-TITLE-TASK'
        : {
            {
                let todolistTasks = state [action.todolistId]
                state [action.todolistId] = todolistTasks.map(m => m.id === action.taskId
                    ? {...m, title: action.title}
                    : m)
            }
            return {...state}
        }
        case
        'ADD-TODOLIST'
        : {
            {
                const stateCopy = {...state}
                stateCopy[action.todolistId] = [];


                return stateCopy
            }
        }
        case
        'REMOVE-TODOLIST'
        : {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state;
    }
}

export const addNewTaskAC = (title: string, todolistId: string): addNewTaskACType => {
    return {
        type: 'ADD-NEW-TASK',
        title,
        todolistId
    }
}
export const removeTaskAC = (taskId: string, todoListId: string): removeTaskACType => {
    return {
        type: 'REMOVE-TASK', taskId: taskId, todolistId: todoListId
    }
}
export const changeStatusAC = (idTask: string, isDone: boolean, todolistId: string): changeStatusACType => {
    return {
        type: 'CHANGE-STATUS',
        taskId: idTask,
        isDone,
        todolistId
    }
}
export const changeTitleTaskAC = (taskId: string, title: string, todolistId: string): changeTitleTaskACType => {
    return {
        type: 'CHANGE-TITLE-TASK',
        taskId,
        title,
        todolistId
    }
}


export const getTasksTC = (todoId:string) => {
    return    (dispatch: Dispatch) => {

        DALLTodolistAPI.getTasks(todoId)
            .then( (res) => {
                debugger
            })}
}














