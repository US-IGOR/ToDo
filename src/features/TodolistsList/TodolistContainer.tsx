import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import React, {useCallback, useEffect} from "react";
import {addTasksTC, changeTitleTaskAC, removeTasksTC, TaskStatuses, updTaskStatusTC} from "./tasks-reducer";
import {
    addTodosTC,
    ChangeTodolistFilterAC,
    changeTodoTitleTC,
    filterValuesType, getTodosTC,
    RemoveTodosTC, TodolistDomainType
} from "./todolists-reducer";
import {TasksStateType, todolistsType} from "../../app/App";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {InitialStateType} from "../../app/app-reducer";


export const TodolistContainer: React.FC = () => {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todoLists)
    const disableAddTodoButon = useSelector<AppRootState, boolean> (state =>
        state.app.disableAddNewTodoButton)
    const taskObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(getTodosTC())
    }, [])

//tasks_func's



    const remove = useCallback((taskID: string, todoID: string) => {

        dispatch(removeTasksTC(taskID, todoID))
    }, [])
    const addNewTask = useCallback((title: string, todoID: string) => {

        dispatch(addTasksTC(todoID, title))
    }, [])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todoID: string) => {
        dispatch(updTaskStatusTC(id, status, todoID))
    }, [])
    const changeTitleTask = useCallback((id: string, newTitle: string, todoID: string) => {
        dispatch(changeTitleTaskAC(id, newTitle, todoID))
    }, [])


//toDOLists_func's
    const changeFilter = useCallback((filter: filterValuesType, todolistId: string) => {

        dispatch(ChangeTodolistFilterAC(filter, todolistId))
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




    return <>
        <Grid container style={{padding: "20px"}}>

            <AddItemForm addNewItem={addTodolist} disabled={disableAddTodoButon}/>
        </Grid>
        <Grid container spacing={3}>

            {
                todolists.map((m) => {

                    let filteredTodolist = taskObj[m.id];


                    return <Grid item>
                        <Paper elevation={10} style={{padding: "10px"}}>
                            <Todolist title={m.title}
                                      key={m.id}
                                      filter={m.filter}
                                      id={m.id}
                                      entityStatus={m.entityStatus}


                                      data={filteredTodolist}
                                      remove={remove}
                                      changeFilter={changeFilter}
                                      addNewTask={addNewTask}
                                      changeStatus={changeStatus}
                                      deleteTodolist={deleteTodolist}
                                      changeTodolistTitle={changeTodolistTitle}
                                      changeTitleTask={changeTitleTask}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
