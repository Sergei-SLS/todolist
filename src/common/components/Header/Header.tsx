import {NavButton} from "../NavButton/NavButton.ts";
import Switch from "@mui/material/Switch";
import MenuIcon from "@mui/icons-material/Menu";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {changeThemeModeAC} from "../../../app/app-reducer.ts";
import {getTheme} from "../../theme/theme.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {selectThemeMode} from "../../../app/app-selectors.ts";
import { AppBar, Container, IconButton } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {containerSx} from "../../styles/container.styles.ts";


export const Header = () => {
    const dispatch = useAppDispatch()
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                        </IconButton>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={changeMode}/>
                </Container>
            </Toolbar>
        </AppBar>
    )
}