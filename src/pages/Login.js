import { Link } from "react-router-dom";
import {useState} from "react"

// TODO:
// submit handler
// display errors
// make pretty

export default function Login(props) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const nameHandler = (e) => {
    const value = e.target.value;
    setName(value)
  }

  const passwordHandler = (e) => {
    const value = e.target.value
    setPassword(value)
  }

  const submit = () => {
    
  }

  return (
    <div>
      <h1>login, my dude</h1>

      <div >
        <input placeholder="name" onChange={nameHandler} value={name} />
        <input placeholder="password" onChange={passwordHandler} value={password} />
        <button onClick={submit}>Login</button>
      </div>
      

      <Link to="play"> play, anyway</Link>
    </div>
  )
}