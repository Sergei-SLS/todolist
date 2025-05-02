import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoListItem} from "./TodoListItem.tsx";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "./model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "./model/tasks-reducer.ts";
import {FilterValues} from "./app/App.tsx";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {selectTodolists} from "./model/todolists-selectors.ts";
import {selectTasks} from "./model/tasks-selectors.ts";


export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }


    const getCurrentDate = (): string => {
        const today = new Date()
        return today.toLocaleDateString('ru-Ru')
    }
    return (
        {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                    filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = tasks[todolist.id].filter(task => task.isDone)
                }
                return (
                    <Grid key={todolist.id}>
                        <Paper elevation={4} sx={{p: '0 20px 20px 20px'}}>
                            <TodoListItem
                                todolist={todolist}
                                tasks={filteredTasks}

                                deleteTask={deleteTask}
                                changeFilter={changeFilter}
                                createTask={createTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                                deleteTodolist={deleteTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                                date={getCurrentDate()}
                            />
                        </Paper>
                    </Grid>
                )
            })}
    )
}