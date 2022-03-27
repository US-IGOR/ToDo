import React from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "../features/TodolistsList/tasks-reducer";
import {TodolistContainer} from "../features/TodolistsList/TodolistContainer";


//APP
export const App = React.memo(() => {


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
                <TodolistContainer/>
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
