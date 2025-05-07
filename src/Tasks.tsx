import {Todolist} from "./app/App.tsx";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import {getListItemSX} from "./TodolistItem.styles.ts";
import {EditableSpan} from "./EditableSpan.tsx";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {selectTasks} from "./model/tasks-selectors.ts";


type TasksProps = {
    todolist: Todolist
}

export const Tasks = ({todolist}: TasksProps) => {
    const {id, filter} = todolist
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(selectTasks)
    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks


    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }
    return (
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

    )
}