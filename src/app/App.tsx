import './App.css'
import {Fragment} from "react";
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectThemeMode} from "./app-selectors.ts";
import {getTheme} from "../common/theme/theme.ts";
import {Header} from '../common/components/Header/Header.tsx';
import {Main} from './Main.tsx';


export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, Task[]>

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
    date: string
}

export const App = () => {

    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <Fragment>
            <div className="app">
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Header/>
                   <Main/>
                </ThemeProvider>
            </div>
        </Fragment>
    )
}

