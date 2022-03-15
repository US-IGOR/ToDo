import {v1} from "uuid";
import {todolistsType} from "../AppWithRedux";
import {useEffect} from "react";
import {DALLTodolistAPI} from "../api/DALL-todolistAPI";
import {Dispatch} from "redux";


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


export let todolistID_1 = v1()
export let todolistID_2 = v1()

export type filterValueType = 'all' | 'active' | 'completed';
export type TodolistDomainType = todolistsType & {
    filter?: filterValueType
    order: number
    addedDate: string
}


type AAAAAAAAAAAAAAAAAAAAAAAA = {
    addedDate: string
    id: string
    order: number
    title: string
    //   filter?: 'all' | 'active' | 'completed'
}


let a: TodolistDomainType
let b: todolistsType



const initialState: Array<todolistsType> =
    [
        /*        {id: todolistID_1, title: '*****state from Redux*****', filter: 'all'},
                {id: todolistID_2, title: 'What to buy?', filter: 'active'}*/
    ]


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
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(f => f.id === action.id)
            if (todolist)
                todolist.title = action.title
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(f => f.id === action.id)
            if (todolist)
                todolist.filter = action.filter;
            return [...state]
        }
        case 'GET-TODOS': {
            let a: Array<TodolistDomainType> = action.todolists.map((t) => {
                return {...t, filter: 'all'}
            })

            return [...a]

        }
        default:
            return state;
    }
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
export const ChangeTodolistFilterAC = (filter: filterValueType, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    } as const
}
export const GetToDosAC = (todolists: Array<AAAAAAAAAAAAAAAAAAAAAAAA>) => {
    return {
        type: 'GET-TODOS',
        todolists
    } as const
}


export const getTodosTC = () => (dispatch: Dispatch, getState: any): void => {

//1.side effects
             DALLTodolistAPI.getTodos()
            .then((res) => {
//2.dispatch actions (thunk)
            dispatch(GetToDosAC(res.data))
        })
}


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
