import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {Fragment} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {
    const tasks1: Task[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'TypeScript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ]

    const tasks2: Task[] = [] /*Удалить перед вторым уроком*/
    return (
        <Fragment>
            <div className="app">
                <TodoListItem title='What to learn' tasks={tasks1} date='06.01.2025'/>
                <TodoListItem title='Song' tasks={tasks2}/> {/*Удалить перед вторым уроком*/}
            </div>
        </Fragment>

)
}
