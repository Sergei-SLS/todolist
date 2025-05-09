import {Todolist} from "../../../../../app/App.tsx";
import {CreateItemForm} from "../../../../../common/components/CreateItemForm/CreateItemForm.tsx";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch.ts";
import {createTaskAC} from "../../../model/tasks-reducer.ts";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "./Tasks/Tasks.tsx";
import {FilterButtons} from "./FilterButtons/FilterButtons.tsx";

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