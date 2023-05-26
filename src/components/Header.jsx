import { useContext } from "react"
import { UserContext } from "../contexts/user"
import { Avatar, Chip, Grid } from "@mui/material"
import { LogoutRounded } from "@mui/icons-material"

function Header (){
    const { userObj, setUserObj } = useContext(UserContext)


    const LogoutHandler = (event) =>{
        event.preventDefault()
        setUserObj(null)
    }
    return (
        <div>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid xs={6}>
                <h1>NC GAMES</h1>
                </Grid>
                <Grid xs={6}>
                    {userObj !== null ? (<Chip deleteIcon={<LogoutRounded/>} onDelete={LogoutHandler} avatar={<Avatar src={userObj.avatar_url}/>} label={userObj.username}/>): null}
                </Grid>
            </Grid>
        </div>
    )
}
export default Header