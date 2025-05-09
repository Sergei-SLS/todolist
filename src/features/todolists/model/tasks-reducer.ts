import type {Task, TasksState} from '../../../app/App.tsx'
import {createTodolistAC,  deleteTodolistAC} from './todolists-reducer.ts'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}

export const createTaskAC = createAction<{todolistId: string, title: string}>('task/createTask')
export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTask')
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/changeTaskTitle')

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTaskAC, (state, action) => {
            const {todolistId,  title} = action.payload
            const newTask: Task = {id: nanoid(), title, isDone: false}
            state[todolistId].push(newTask)
        })
        .addCase(deleteTaskAC, (state, action) => {
            const {todolistId, taskId} = action.payload
            state[todolistId] = state[todolistId].filter(task => task.id !==taskId)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const {todolistId, taskId, isDone} = action.payload
            const task = state[todolistId].find(task => task.id === taskId)
            if(task) {
                task.isDone = isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const {todolistId, taskId, title} = action.payload
            const task = state[todolistId].find(task => task.id === taskId)
            if(task) {
                task.title = title
            }
        })
})