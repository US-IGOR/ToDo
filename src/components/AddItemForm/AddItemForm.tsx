import React, {ChangeEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {RequestStatusType} from "../../app/app-reducer";

type InputClonesType = {
    addNewItem: (titleTodolist: string) => void,
    disabled : boolean

}
export const AddItemForm = React.memo( (props: InputClonesType) => {



    let [titleTodolist, setTitleTodolist] = useState<string>('')
    let [error, setError] = useState<string | null>('')
    const addNewTask = () => {
        if (titleTodolist.trim() !== '') {
            props.addNewItem(titleTodolist.trim())
            setTitleTodolist('')
        } else setError('Error')
    }
    const addNewTaskOnKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (error !==null) {setError(null);}


        if (13 === e.charCode) {
            addNewTask();

        }
    }
    const addNewTaskOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleTodolist(e.currentTarget.value)
    }


    return (<div>

            <TextField value={titleTodolist}
                       variant={"outlined"}
                       label={'add todooo'}
                       onChange={addNewTaskOnChangeHandler}
                       onKeyPress={addNewTaskOnKeyPressHandler}
                       error={!!error}
                       helperText={error}



            />


            <IconButton onClick={addNewTask} color={"primary"} disabled={props.disabled}><Add/></IconButton>
        </div>
    )
});

