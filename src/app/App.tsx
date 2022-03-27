import React, {useCallback, useEffect} from 'react';
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTasksTC,
    changeTitleTaskAC,
    removeTasksTC, TaskType, updTaskStatusTC, TaskStatuses
} from "../features/TodolistsList/tasks-reducer";
import {
    AddTodolistAC, addTodosTC,
    ChangeTodolistFilterAC, ChangeTodolistTitleAC, changeTodoTitleTC,
    filterValueType, getTodosTC,
    RemoveTodolistAC, RemoveTodosTC
} from "../features/TodolistsList/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";



//APP
export const App = React.memo(() => {

    useEffect(() => {
        dispatch(getTodosTC())
    }, [])


    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<todolistsType>>(state => state.todoLists)
    const taskObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    //tasks_func's
    const remove = useCallback((taskID: string, todoID: string) => {
        debugger
        dispatch(removeTasksTC(taskID, todoID))
    }, [])
    const addNewTask = useCallback((title: string, todoID: string) => {
        debugger
        dispatch(addTasksTC(todoID, title))
    }, [])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todoID: string) => {
        dispatch(updTaskStatusTC(id, status, todoID))
    }, [])
    const changeTitleTask = useCallback((id: string, newTitle: string, todoID: string) => {
        dispatch(changeTitleTaskAC(id, newTitle, todoID))
    }, [])


    //toDOLists_func's
    const changeFilter = useCallback((filter: filterValueType, todolistId: string) => {
        debugger
        dispatch( ChangeTodolistFilterAC( filter, todolistId))
    }, [])
    const deleteTodolist = useCallback((todoID: string) => {
        dispatch(RemoveTodosTC(todoID))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodosTC(title))
    }, [])
    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodoTitleTC(id, newTitle))
    }, [])







    return (<div className="App">
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
                    <AddItemForm addNewItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((m) => {

                            let filteredTodolist = taskObj[m.id];


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
})


//types
export type todolistsType = {
    id: string,
    title: string,
    filter: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export default App;
