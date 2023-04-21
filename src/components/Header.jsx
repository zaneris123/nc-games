import { useContext } from "react"
import { UserContext } from "../contexts/user"

function Header (){
    const { userObj, setUserObj } = useContext(UserContext)


    const LogoutHandler = (event) =>{
        event.preventDefault()
        setUserObj(null)
    }
    return (
        <div>
            <h1>NC GAMES</h1>
            {userObj !== null ? (<section><p>Logged in as {userObj.username}</p><button onClick={LogoutHandler}>logout</button></section>): null}
            <h3>NAV</h3>
        </div>
    )
}
export default Header