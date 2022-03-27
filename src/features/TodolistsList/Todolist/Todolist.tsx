import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Tasks} from "./Task/Tasks";
import {getTasksTC, TaskStatuses, TaskType} from "../tasks-reducer";
import {useDispatch} from "react-redux";

type TodolistPropsType = {
    title: string,
    changeFilter: (value: 'all' | 'active' | 'completed', id: string) => void,
    data: Array<TaskType>
    addNewTask: (titleTodolist: string, todoID: string) => void
    filter: string
    id: string
    deleteTodolist: (todoID: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void

    remove: (x: string, todoID: string) => void,
    changeTitleTask: (id: string, newValue: string, todoID: string) => void
    changeStatus: (id: string, status: TaskStatuses, todoID: string) => void
}




export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useDispatch();


    useEffect( ()=> {
        dispatch(getTasksTC(props.id))
    },[])



    let filteredTodolist = props.data


    if (props.filter === 'active') {
        filteredTodolist = props.data.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'completed') {
        filteredTodolist = props.data.filter(t => t.status === TaskStatuses.Completed);
    }

    console.log('Todolist')

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [])
    const onRemoveTodoListHandler = useCallback(() => {
        props.deleteTodolist(props.id)
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])
    const addTask = useCallback((title: string) => {
            props.addNewTask(title, props.id)
        }
        , [props.addNewTask, props.id])
    return (

        <div>
            <div>
                <h3><EditableSpan title={props.title} change={changeTodolistTitle}/>
                    <IconButton onClick={onRemoveTodoListHandler}>
                        <Delete/>
                    </IconButton>
                </h3>
            </div>
            <div>
                <AddItemForm addNewItem={addTask}/>
            </div>
            <div>
                {
                    props.data.map(m =>
                        <Tasks
                            task={m}
                            changeTitleTask={props.changeTitleTask}
                            changeStatus={props.changeStatus}
                            remove={props.remove}
                            todolistId={props.id}
                            key={m.id}
                        />)
                }


            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={"primary"}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={"secondary"}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )

})



