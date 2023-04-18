import { Link } from "react-router-dom"

function Header (){
    return (
        <div>
            <h1>NC GAMES</h1>
            <h3>NAV</h3>
            <Link to='/reviews'>All Reviews</Link>
        </div>
    )
}
export default Header