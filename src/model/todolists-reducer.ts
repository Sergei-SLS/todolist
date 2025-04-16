import {Todolist} from "../App.tsx";



type Actions = DeleteTodolistAction

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
      case 'delete_todolist': {
          return state.filter(todolist => todolist.id !== action.payload.id)
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