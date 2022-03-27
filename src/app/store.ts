import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const RootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

/*type AppRootState = {
    todoLists:Array<ArrayDataType>,
    tasks:TasksStateType
}*/

export type AppRootState = ReturnType<typeof RootReducer>


export const store = createStore(RootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof RootReducer>
export const useAppSelector :TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store;