import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {Fragment, useState} from "react";
import {v1} from "uuid";

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
}

export const App = () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const[todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
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


    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }


    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: [...tasks[todolistId].map(task => task.id === taskId ? {...task, isDone}: task)]})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        // setTodolists((prevState) => prevState.filter(todolist => todolist.id !== todolistId)) prevStаte - предыдущее значение
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <Fragment>
            <div className="app">
                {todolists.map(todolist => {
                    let filteredTasks = tasks[todolist.id]
                    if (todolist.filter === 'active') {
                        filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        filteredTasks = tasks[todolist.id].filter(task => task.isDone)
                    }
                    return (
                        <TodoListItem key={todolist.id}
                                      todolist={todolist}
                                      tasks={filteredTasks}

                                      deleteTask={deleteTask}
                                      changeFilter={changeFilter}
                                      createTask={createTask}
                                      changeTaskStatus={changeTaskStatus}
                                      deleteTodolist={deleteTodolist}
                                      date='06.03.2025'
                        />
                    )
                })}

            </div>
        </Fragment>
)
}
