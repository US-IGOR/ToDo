import {v1} from "uuid";
import {todolistsType} from "../../app/App";
import {useEffect} from "react";
import {DALLTodolistAPI} from "../../api/DALL-todolistAPI";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppStatusAC,
    setAppStatusActionType, setDisableAddNewTodoButtonAC, setDisableAddNewTodoButtonType, setErrorStatusAC,
    setErrorStatusActionType
} from "../../app/app-reducer";


const initialState: Array<TodolistDomainType> =
    [
        /*        {id: todolistID_1, title: '*****state from Redux*****', filter: 'all'},
                {id: todolistID_2, title: 'What to buy?', filter: 'active'}*/
    ]



//REDUCER
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.id)
        }
        case 'ADD-TODOLIST': {

            return [{...action.todolist, filter: 'all', entityStatus:'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            debugger
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'GET-TODOS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus:'idle'}))
        case 'SET-DISABLED-TODOLISTS':
            return state.map(tl => tl.id === action.idTodo ? {...tl, entityStatus: action.entityStatus}:tl)

        default:
            return state;
    }
}


//TC&AC
export const GetToDosAC = (todolists: Array<todolistsType>) => {
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
export const AddTodolistAC = (todolist: toDoFromServerType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    } as const
}

export const ChangeTodolistFilterAC = (filter: filterValuesType, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    filter
} as const)
export const changeTodolistEntityStatusAC = (idTodo: string, entityStatus: RequestStatusType ) => (
    {
        type: 'SET-DISABLED-TODOLISTS',
        idTodo,
        entityStatus
    } as const)



export const getTodosTC = () => (dispatch: Dispatch<ActionsType>, getState: any): void => {
//1.side effects
   dispatch(setAppStatusAC('loading'))
    DALLTodolistAPI.getTodos()
        .then((res) => {
//2.dispatch actions (thunk)
            dispatch(GetToDosAC(res.data))
            dispatch(setAppStatusAC('succeeded'));
        })
}
export const RemoveTodosTC = (todoId: string) => (dispatch: Dispatch<ActionsType>): void => {
    dispatch(changeTodolistEntityStatusAC(todoId,'loading'))
    DALLTodolistAPI.deleteTodo(todoId)
        .then((res) => {
            dispatch(RemoveTodolistAC(todoId))
        })
}
export const addTodosTC = (title: string) => (dispatch: Dispatch<ActionsType>): void => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setDisableAddNewTodoButtonAC(true))

    DALLTodolistAPI.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === 0 ) {
                dispatch(AddTodolistAC(res.data.data.item))
            } else {
                dispatch(setErrorStatusAC(res.data.messages[0]))
            }




            dispatch(setAppStatusAC('idle'))
            dispatch(setDisableAddNewTodoButtonAC(false))
        })
}
export const changeTodoTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>): void => {
    DALLTodolistAPI.updateTodo({todolistId, title})
        .then((res) => {
            dispatch(ChangeTodolistTitleAC(todolistId, title))
        })
}





//types
type ActionsType =
    | changeTodolistEntityStatusType
    | setErrorStatusActionType
    | setAppStatusActionType
    | RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | GetToDosACType
    | ChangeTodolistFilterACType
    | setDisableAddNewTodoButtonType
    | setErrorStatusActionType


export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>
export type GetToDosACType = ReturnType<typeof GetToDosAC>
export type changeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>;

export type filterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = todolistsType & {
/*    filter?: filterValueType
    order: number
    addedDate: string*/
    filter: filterValuesType
    entityStatus: RequestStatusType  //  'idle' | 'loading' | 'succeeded' | 'failed'
}

type toDoFromServerType = {
    addedDate: string
    id: string
    order: number
    title: string
    //   filter?: 'all' | 'active' | 'completed'
}

