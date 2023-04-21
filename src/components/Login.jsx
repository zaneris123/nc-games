import { useContext, useState } from "react"
import { UserContext } from "../contexts/user"
import { getUsers } from "./api"

function Login(){
  const { userObj, setUserObj } = useContext(UserContext)
  const [userInput, setUserInput] = useState("")
  const [userErr, setUserErr] = useState(false)

  const LoginHandler = (event) =>{
    event.preventDefault()
    getUsers()
    .then((users)=>{
        for(let i = 0; i < users.length; i++){
            if(users[i].username === userInput){
                setUserObj(users[i])
            }
        }
        if(userObj === null){
            setUserErr(true)
        }
    })
  }
    return(
        <form onSubmit={LoginHandler}>
            <label>Please login</label><br/>
            <label>Username: </label>
            <input type='text' value={userInput} onChange={(event)=>setUserInput(event.target.value)}/>
            <section>
                <button type="submit">Login</button>
            </section>
            {userErr ? <p>Username not found</p> : null}
        </form>
    )
}
export default Login