import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {} from "../Todolist";
import {TaskStatuses, TaskType} from "../../tasks-reducer";

type TasksPropsType = {
    remove: (x: string, todoID: string) => void,
    changeTitleTask: (id: string, newValue: string, todoID: string) => void
    changeStatus: (id: string, status: TaskStatuses, todoID: string) => void
    task: TaskType
    todolistId: string
}
export const Tasks = React.memo((props: TasksPropsType) => {

    console.log('Tasks')

        const onCheckBoxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
        }, [props.task.id, props.todolistId]);


        const onChangeTitleHandler =  useCallback( (newValue: string) => {
            props.changeTitleTask(props.task.id, newValue, props.todolistId)
        } ,[props.changeTitleTask,props.task.id,props.todolistId])
        const onClickRemoveHandler = () => {
          props.remove(props.task.id, props.todolistId)
        }
        return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onCheckBoxHandler}/>
            <EditableSpan title={props.task.title} change={onChangeTitleHandler}/>
            <IconButton onClick={onClickRemoveHandler}>
                <Delete/>
            </IconButton>


        </div>
    }
)