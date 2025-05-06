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

type Props = {
    todolist: Todolist
    date?: string
    // deleteTask: (todolistId: string, taskId: string) => void
    // changeFilter: (todolistId: string, filter: FilterValues) => void
    // createTask: (todolistId: string, title: string) => void
    // changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    // changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    // deleteTodolist: (todolistId: string) => void
    // changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodoListItem = ({
                                 todolist: {id, title, filter},
                                 date,
                                 // deleteTask,
                                 // deleteTodolist,
                                 // changeFilter,
                                 // createTask,
                                 // changeTaskStatus,
                                 // changeTaskTitle,
                                 // changeTodolistTitle
                             }: Props) => {

    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()
    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: id, title}))
    }

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id}))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }



    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon/>
            </IconButton>
            </h3>
            <CreateItemForm onCreateItem={createTask}/>
            {
                filteredTasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <List>
                        {filteredTasks.map(task => {
                            const deleteTask = () => {
                                dispatch(deleteTaskAC({todolistId: id, taskId: task.id}))
                            }

                            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                dispatch(changeTaskStatusAC({todolistId: id, taskId: task.id, isDone: newStatusValue}))
                            }

                            const changeTaskTitle = (title: string) => {
                                dispatch(changeTaskTitleAC({todolistId: id, taskId: task.id, title}))
                            }

                            return (
                                <ListItem key={task.id}
                                          sx={getListItemSX(task.isDone)}>
                                    <div>
                                        <Checkbox
                                            checked={task.isDone}
                                            onChange={changeTaskStatus}/>
                                        <EditableSpan value={task.title}
                                                      onChange={changeTaskTitle}/>
                                    </div>
                                    <IconButton onClick={deleteTask}>
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