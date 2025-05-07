import {FilterValues, Todolist} from "./app/App.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from '@mui/material/Box'
import {containerSx, getListItemSX} from "./TodolistItem.styles.ts";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {selectTasks} from "./model/tasks-selectors.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "./model/tasks-reducer.ts";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "./model/todolists-reducer.ts";
import {TodolistTitle} from "./TodolistTitle.tsx";
import { Tasks } from "./Tasks.tsx";

type Props = {
    todolist: Todolist
    date?: string
}

export const TodoListItem = ({
                                 todolist: {id, title, filter},
                                 date
                             }: Props) => {


    const dispatch = useAppDispatch()


    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: id, title}))
    }

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>

            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilter('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilter('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilter('completed')}>
                    Completed
                </Button>
            </Box>
            <div style={{marginTop: '10px'}}>{date}</div>
        </div>
    )
}