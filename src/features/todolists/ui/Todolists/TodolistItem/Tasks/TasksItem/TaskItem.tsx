import {Task} from "../../../../../../../app/App.tsx";
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch.ts";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../../../../../model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan.tsx";
import {getListItemSX} from "./TaskItem.styles.ts";

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: newStatusValue}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
    }
    return (
        <ListItem sx={getListItemSX(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone}
                          onChange={changeTaskStatus}/>
                <EditableSpan value={task.title}
                              onChange={changeTaskTitle}/>
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}