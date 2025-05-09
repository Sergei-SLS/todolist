import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoListItem} from "./TodolistItem/TodoListItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "../../model/todolists-selectors.ts";


export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    const getCurrentDate = (): string => {
        const today = new Date()
        return today.toLocaleDateString('ru-Ru')
    }
    return (
        <>
            {todolists.map(todolist => {

                return (
                    <Grid key={todolist.id}>
                        <Paper elevation={4} sx={{p: '0 20px 20px 20px'}}>
                            <TodoListItem
                                todolist={todolist}
                                date={getCurrentDate()}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
            )
}