import {ChangeEvent, useState} from "react";

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

    return (
        <>
            {isEditMode
                ? <input
                    onChange={changeTitle}
                    value={title}
                    autoFocus
                    onBlur={editHandler}
                />
                : <span onDoubleClick={editHandler}>{value}</span>}
        </>
    )
}