import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";


type EditabileSpanPropsType = {
    title: string
    change:(value:string)=>void

}
export const EditableSpan = React.memo((props: EditabileSpanPropsType) => {

    console.log('EditableSpan render')

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }



    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.change(title)

    }


    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus={true}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})