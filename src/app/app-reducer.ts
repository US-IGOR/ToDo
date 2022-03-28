export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: 'error' as string | null ,
    disableAddNewTodoButton: false,
    disableAddNewTaskButton: false,

}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-DISABLE-ADD-NEW-TODO-BUTTON':
            return {...state, disableAddNewTodoButton: action.dis }

        default:
            return state
    }
}

export const setAppStatusAC = (status:RequestStatusType) => ({type: 'APP/SET-STATUS', status}as const)
export const setErrorStatusAC = (error: string | null) => ({type: 'APP/SET-ERROR', error}as const)
export const setDisableAddNewTodoButtonAC = (dis:boolean) => ({type: 'APP/SET-DISABLE-ADD-NEW-TODO-BUTTON',dis}as const)


export type setAppStatusActionType = ReturnType  <typeof setAppStatusAC>
export type setErrorStatusActionType = ReturnType  <typeof setErrorStatusAC>
export type setDisableAddNewTodoButtonType = ReturnType  <typeof setDisableAddNewTodoButtonAC>


type ActionsType =
    |setAppStatusActionType
    |setErrorStatusActionType
    |setDisableAddNewTodoButtonType


