import {v1} from "uuid";
import {todolistsType} from "../../app/App";
import {useEffect} from "react";
import {DALLTodolistAPI} from "../../api/DALL-todolistAPI";
import {Dispatch} from "redux";



//REDUCER
export const todolistsReducer = (state: Array<todolistsType> = initialState, action: ActionsType): Array<todolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all'
                },
                ...state
            ]
        }
        case 'CHANGE-TODOLIST-TITLE':
       return state.map(tl=> tl.id === action.id ? {...tl , title:action.title} : tl )
        case 'CHANGE-TODOLIST-FILTER':
            debugger
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        case 'GET-TODOS':
            return action.todolists.map(tl => ({...tl, filter:'all'}) )


        default:
            return state;
    }
}

//TC&AC
export const GetToDosAC = (todolists: Array<toDoFromServerType>) => {
    return {
        type: 'GET-TODOS',
        todolists
    } as const
}
export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: id
    } as const
}
export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
    } as const
}
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    } as const
}

export const ChangeTodolistFilterAC = (filter: filterValueType, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id:todolistId,
    filter
} as const)

export const getTodosTC = () => (dispatch: Dispatch, getState: any): void => {
//1.side effects
    DALLTodolistAPI.getTodos()
        .then((res) => {
//2.dispatch actions (thunk)
            dispatch(GetToDosAC(res.data))
        })
}
export const addTodosTC = (title:string) => (dispatch: Dispatch): void => {
    DALLTodolistAPI.createTodo(title)
        .then((res) => {
            dispatch(AddTodolistAC(res.data.data.item.title))
        })
}
export const RemoveTodosTC = (todoId:string) => (dispatch: Dispatch): void => {
    DALLTodolistAPI.deleteTodo(todoId)
        .then((res) => {
            dispatch(RemoveTodolistAC(todoId))
        })
}
export const changeTodoTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch): void => {
    DALLTodolistAPI.updateTodo({ todolistId, title })
        .then((res) => {
            dispatch(ChangeTodolistTitleAC(todolistId,title))
        })
}


//types
type ActionsType =
    | RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | GetToDosACType
    | ChangeTodolistFilterACType


export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>
export type GetToDosACType = ReturnType<typeof GetToDosAC>



export type filterValueType = 'all' | 'active' | 'completed';
export type TodolistDomainType = todolistsType & {
    filter?: filterValueType
    order: number
    addedDate: string
}

type toDoFromServerType = {
    addedDate: string
    id: string
    order: number
    title: string
    //   filter?: 'all' | 'active' | 'completed'
}


const initialState: Array<todolistsType> =
    [
        /*        {id: todolistID_1, title: '*****state from Redux*****', filter: 'all'},
                {id: todolistID_2, title: 'What to buy?', filter: 'active'}*/
    ]

/*export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    id: string,
    title:string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: string
}*/
