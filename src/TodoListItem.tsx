import {Todolist} from "./app/App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {createTaskAC} from "./model/tasks-reducer.ts";
import {TodolistTitle} from "./TodolistTitle.tsx";
import {Tasks} from "./Tasks.tsx";
import {FilterButtons} from "./FilterButtons.tsx";

type Props = {
    todolist: Todolist
    date?: string
}

export const TodoListItem = ({todolist, date}: Props) => {

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
            <div style={{marginTop: '10px'}}>{date}</div>
        </div>
    )
}