import {Todolist} from "../../../app/App.tsx";
import {RootState} from "../../../app/store.ts";


export const selectTodolists = (state: RootState): Todolist[] => state.todolists