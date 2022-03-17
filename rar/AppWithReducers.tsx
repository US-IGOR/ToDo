import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {ArrayDataType, Todolist} from "./Todolist";
import {InputClones} from "./InputClones";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addNewTaskAC, changeStatusAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC, ChangeTodolistTitleAC,
    filterValueType,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";

export type todolistsType = {
    id: string,
    title: string,
    filter: string
}
export type TasksStateType = {
    [key: string]: Array<ArrayDataType>
}





function AppWithReducers() {

    let todolistID_1 = v1()
    let todolistID_2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID_1, title: 'What to learn (*****state from useReduser*****)?', filter: 'all'},
        {id: todolistID_2, title: 'What to buy?', filter: 'active'}
    ])
    let [taskObj, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todolistID_1]: [
                {id: v1(), title: 'css', isDone: true},
                {id: v1(), title: 'ts', isDone: false},
                {id: v1(), title: 'js', isDone: true}
            ],
            [todolistID_2]: [
                {id: v1(), title: 'bear', isDone: true},
                {id: v1(), title: 'milk', isDone: false},
                {id: v1(), title: 'water', isDone: true}
            ]
        });

    //tasks_func's
    function addNewTask(titleTodolist: string, todoID: string) {
        dispatchToTasksReducer(addNewTaskAC(titleTodolist, todoID))
    }

    function remove(taskID: string, todoID: string) {
        const action = removeTaskAC(taskID, todoID)
        dispatchToTasksReducer(action)
    }

    function changeStatus(id: string, isDone: boolean, todoID: string) {
        dispatchToTasksReducer(changeStatusAC(id, isDone, todoID))
    }

    function changeTitleTask(id: string, newTitle: string, todoID: string) {
        dispatchToTasksReducer(changeTitleTaskAC(id, newTitle, todoID))
    }


    //toDOLists_func's
    const changeFilter = (filter: filterValueType, id: string) => {
        const action = ChangeTodolistFilterAC(filter, id)
        dispatchToTodolistsReducer(action)
    }

    const deleteTodolist = (todoID: string) => {
      const action=RemoveTodolistAC(todoID)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function addTodolist(title: string) {
       const action=AddTodolistAC(title)

        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatchToTodolistsReducer(ChangeTodolistTitleAC(id,newTitle))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todoooo
                    </Typography>
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <InputClones addNewItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((m) => {

                            let filteredTodolist = taskObj[m.id];
                            if (m.filter === 'active') {
                                filteredTodolist = filteredTodolist.filter(f => !f.isDone);
                            }
                            if (m.filter === 'completed') {
                                filteredTodolist = filteredTodolist.filter(f => f.isDone);
                            }
                            return <Grid item>
                                <Paper elevation={10} style={{padding: "10px"}}>
                                    <Todolist title={m.title}
                                              key={m.id}
                                              data={filteredTodolist}
                                              remove={remove}
                                              changeFilter={changeFilter}
                                              addNewTask={addNewTask}
                                              changeStatus={changeStatus}
                                              filter={m.filter}
                                              id={m.id}
                                              deleteTodolist={deleteTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                              changeTitleTask={changeTitleTask}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithReducers;
