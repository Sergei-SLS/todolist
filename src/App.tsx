import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {Fragment, useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    const [tasks, setTasks] = useState<Task[]> ([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'TypeScript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])

    const deleteTask = (taskId: number) => {
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

    return (
        <Fragment>
            <div className="app">
                <TodoListItem title='What to learn'
                              tasks={filteredTasks}
                              date='06.01.2025'
                              deleteTask={deleteTask}
                              changeFilter={changeFilter}/>
            </div>
        </Fragment>
)
}
