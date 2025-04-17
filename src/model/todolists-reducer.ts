import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";



type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistAC | ChangeTodolistFilterAC

const initialState: Todolist[] = []


export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
      case 'delete_todolist': {
          return state.filter(todolist => todolist.id !== action.payload.id)
      }
      case 'create_todolist': {
          const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all', date: action.payload.date}
          return [...state, newTodolist]
      }
      case 'change_todolistTitle': {
          return state.map(todolist => todolist.id === action.payload.id ? {...todolist, title: action.payload.title} : todolist)
      }
      case 'change_todolist_filter' : {
          return state.map(todolist => todolist.id === action.payload.id ? {...todolist, filter: action.payload.filter} : todolist)
      }
      default:
          return state
  }
}

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: { id }} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

// export type DeleteTodolistAction = {
//     type: 'delete_todolist'
//     payload: {
//         id: string
//     }
// }

export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: { id: v1(), title, date: new Date().toLocaleString() }} as const
}

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'change_todolistTitle', payload: {id , title}} as const
}

export type ChangeTodolistAC = ReturnType<typeof changeTodolistTitleAC>


export const changeTodolistFilterAC = (id: string, filter: FilterValues) => {
    return {type: 'change_todolist_filter', payload: {id, filter}} as const
}

export type ChangeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC>