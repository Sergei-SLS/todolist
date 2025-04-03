import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button.tsx";

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: Props) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={itemTitle}
                   placeholder={'Write new task'}
                   onChange={changeItemTitleHandler}
                   onKeyDown={createItemOnEnterHandler}/>
            <Button title={'+'} onClick={createItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
  )
}