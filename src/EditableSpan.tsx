import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    const editHandler = () => {
        setIsEditMode(!isEditMode)
        onChange(title)
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownTodolistHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editHandler();
        }
    }

    return (
        <>
            {isEditMode ? (
                <TextField variant={'standard'}
                           value={title}
                           size={'small'}
                           autoFocus
                           onChange={changeTitle}
                           onBlur={editHandler}
                           onKeyDown={onKeyDownTodolistHandler}/>
            ) : <span onDoubleClick={editHandler}>{value}</span>}
        </>
    )
}