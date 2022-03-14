import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {ArrayDataType} from "../Todolist";
import {TasksStateType} from "../AppWithRedux";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
    todoLists:todolistsReducer,
    tasks:tasksReducer
})

/*type AppRootState = {
    todoLists:Array<ArrayDataType>,
    tasks:TasksStateType
}*/

export type AppRootState = ReturnType<typeof RootReducer>




export const store = createStore(RootReducer,applyMiddleware(thunk)) ;






// @ts-ignore
window.store = store;