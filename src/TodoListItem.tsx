import {FilterValues, Task, Todolist} from "./App.tsx";
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

type Props = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodoListItem = ({
                                 todolist: {id, title, filter},
                                 tasks,
                                 date,
                                 deleteTask,
                                 deleteTodolist,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 changeTaskTitle,
                                 changeTodolistTitle
                             }: Props) => {

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
            </h3>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {
                tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <List>
                        {tasks.map(task => {
                            const deleteTaskHandler = () => {
                                deleteTask(id, task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(id, task.id, newStatusValue)
                            }

                            const changeTaskTitleHandler = (title: string) => {
                                changeTaskTitle(id, task.id, title)
                            }

                            return (
                                <ListItem key={task.id}
                                          sx={getListItemSX(task.isDone)}>
                                    <div>
                                        <Checkbox
                                            checked={task.isDone}
                                            onChange={changeTaskStatusHandler}/>
                                        <EditableSpan value={task.title}
                                                      onChange={changeTaskTitleHandler}/>
                                    </div>
                                    <IconButton onClick={deleteTaskHandler}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                )
            }

            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </Box>
            <div>{date}</div>
        </div>
    )
}