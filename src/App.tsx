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

export const App = () => {
    const [tasks, setTasks] = useState<Task[]> ([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const deleteTask = (taskId: string) => {
        const filteredTask = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTask)
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    const [filter, setFilter] = useState<FilterValues>('all')

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    return (
        <Fragment>
            <div className="app">
                <TodoListItem title='What to learn'
                              tasks={filteredTasks}
                              date='06.01.2025'
                              deleteTask={deleteTask}
                              changeFilter={changeFilter}
                              createTask={createTask}
                />
            </div>
        </Fragment>
)
}
