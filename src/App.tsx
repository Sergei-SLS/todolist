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
    const[todolists, setTodolists] = useState<Todolist[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])


// export const App = () => {
//     const [tasks, setTasks] = useState<Task[]> ([
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//         {id: v1(), title: 'Redux', isDone: false},
//         {id: v1(), title: 'TypeScript', isDone: false},
//         {id: v1(), title: 'RTK query', isDone: false},
//     ])

    const deleteTask = (taskId: string) => {
        const filteredTask = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTask)
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }


    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task)
        setTasks(newState)
    }

    return (
        <Fragment>
            <div className="app">
                {todolists.map(todolist => {
                    let filteredTasks = tasks
                    if (todolist.filter === 'active') {
                        filteredTasks = tasks.filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        filteredTasks = tasks.filter(task => task.isDone)
                    }
                    return (
                        <TodoListItem key={todolist.id}
                                      todolist={todolist}
                                      tasks={filteredTasks}

                                      deleteTask={deleteTask}
                                      changeFilter={changeFilter}
                                      createTask={createTask}
                                      changeTaskStatus={changeTaskStatus}
                                      date='06.03.2025'
                        />
                    )
                })}

            </div>
        </Fragment>
)
}
