import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/user"

function Header (){
    const { username, setUsername } = useContext(UserContext)
    const LogoutHandler = (event) =>{
        event.preventDefault()
        setUsername(null)
    }
    return (
        <div>
            <h1>NC GAMES</h1>
            {username !== null ? (<section><p>Logged in as {username.username}</p><button onClick={LogoutHandler}>logout</button></section>): null}
            <h3>NAV</h3>
            <Link to='/reviews'>All Reviews</Link>
        </div>
    )
}
export default Header