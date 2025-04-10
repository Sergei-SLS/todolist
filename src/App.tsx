import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {Fragment, useState} from "react";
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

type ThemeMode = 'light' | 'dark'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

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

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all', date: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', date: ''},
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ]
    })

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

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }


    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)]
        })
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: Todolist = {id: todolistId, title, filter: 'all', date: getCurrentDate()}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        // setTodolists((prevState) => prevState.filter(todolist => todolist.id !== todolistId)) prevStаte - предыдущее значение
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
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
                                                          date={todolist.date}
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

