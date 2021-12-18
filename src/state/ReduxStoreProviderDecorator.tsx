import {Provider} from "react-redux";
import {store} from "./store";
import AppWithRedux from "../AppWithRedux";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {AppWithReduxStories} from "../AppWithRedux.stories";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists:todolistsReducer




})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

class AppRootStateType {
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);




//HOK

export const ReduxStoreProviderDecorator = (storyFn:()=>React.ReactNode) =>  <Provider store={storyBookStore}>
    {storyFn()}
</Provider>
