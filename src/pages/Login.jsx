import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Input } from "semantic-ui-react";

export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const nameHandler = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const passwordHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const submit = () => {};

  return (
    <div>
      <h1>login, my dude</h1>
      <div>
        <Input placeholder="name" onChange={nameHandler} value={name} />
        <Input
          placeholder="password"
          onChange={passwordHandler}
          value={password}
        />
        <Button onClick={submit}>Login</Button>
      </div>
      <Link to="configure"> play, anyway</Link>
    </div>
  );
}
