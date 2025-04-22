

export type DeleteTaskActionType = {
    type: 'DELETE-TASK'
    todolistId: string
    taskId: string
}


type ActionsType = DeleteTaskActionType


export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(task => task.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }

        default:
            throw new Error('Unknown action')
    }
}

export const deleteTaskAC = (taskId: string, todolistId: string): DeleteTaskActionType => {
    return { type: 'DELETE-TASK', todolistId, taskId}
}