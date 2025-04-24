import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {Fragment, useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from "./model/task-reducer.ts";

type ThemeMode = 'light' | 'dark'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = {
    [key: string]: Task[]
}
// export type TasksState = Record<string, Task[]>

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
    date: string
}

export const App = () => {
    const todolistId1 = v1();
    const todolistId2 = v1();


    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{})

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const createTodolist = (title: string) => {

        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const deleteTodolist = (todolistId: string) => {

        const action = deleteTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(deleteTaskAC({todolistId, taskId}))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatchToTasks(createTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, title}))
    }


    const getCurrentDate = (): string => {
        const today = new Date()
        return today.toLocaleDateString('ru-Ru')
    }

    return (
        <Fragment>
            <div className="app">
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AppBar position="static" sx={{mb: '30px'}}>
                        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Container maxWidth={'lg'} sx={containerSx}>
                                <IconButton color="inherit">
                                    <MenuIcon/>
                                </IconButton>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </Container>
                        </Toolbar>
                    </AppBar>
                    <Container maxWidth={'lg'}>
                        <Grid container sx={{mb: '30px'}}>
                            <CreateItemForm onCreateItem={createTodolist}/>
                        </Grid>
                        <Grid container spacing={4}>
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
                                            <TodoListItem key={todolist.id}
                                                          todolist={todolist}
                                                          tasks={filteredTasks}

                                                          deleteTask={deleteTask}
                                                          changeFilter={changeFilter}
                                                          createTask={createTask}
                                                          changeTaskStatus={changeTaskStatus}
                                                          changeTaskTitle={changeTaskTitle}
                                                          deleteTodolist={deleteTodolist}
                                                          changeTodolistTitle={changeTodolistTitle}
                                                          date={getCurrentDate}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Container>
                </ThemeProvider>
            </div>
        </Fragment>
    )
}

