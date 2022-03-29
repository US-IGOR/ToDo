import React from 'react';
import {AppBar, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "../features/TodolistsList/tasks-reducer";
import {TodolistContainer} from "../features/TodolistsList/TodolistContainer";
import {useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


//APP
export const App = React.memo(() => {

    // const status =    useSelector<AppRootStateType, RequestStatusType >(state => state.app.status)
    const status =    useAppSelector< RequestStatusType >(state => state.app.status)


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
            {status === "loading" && <LinearProgress /> }
            <Container fixed>
                <TodolistContainer/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
})


//types
export type todolistsType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export default App;
