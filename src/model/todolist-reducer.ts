import {Todolist} from "../App.tsx";


const initialState: Todolist[] = []

export const todolistReducer = (state: Todolist[] = initialState, action: Action): Todolist[] => {
  switch (action.type) {
      case 'delete_todolist': {
          return state
      }
      default:
          return state
  }
}

type Action = {
    type: string,
    payload: any
}