import React from "react";
import { useNavigate } from "react-router";

import Toggle from "../components/toggle";

const formDefault = {
  exactMatch: false,
  shuffle: false,
  timed: false,
};

const ConfigureGame = () => {
  const [form, setForm] = React.useState(formDefault);
  const { shuffle, timed, exactMatch } = form;

  const navigate = useNavigate();

  const toggleSetting = ({ target }) => {
    const { name } = target;
    const value = form[name];

    setForm({ ...form, [name]: !value });
  };

  const submit = (e) => {
    e.preventDefault();

    navigate("/play");
  };

  return (
    <main>
      <h1>Game Settings</h1>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <form
          style={{ width: "300px", display: "flex", flexDirection: "column" }}
        >
          <Toggle
            text="Require exact match:"
            name="exactMatch"
            checked={exactMatch}
            onChange={toggleSetting}
          />

          <Toggle
            text="Shuffle:"
            name="shuffle"
            checked={shuffle}
            onChange={toggleSetting}
          />

          <Toggle
            text="Timed:"
            name="timed"
            checked={timed}
            onChange={toggleSetting}
          />

          <button onClick={submit}>Lets play!</button>
        </form>
      </section>
    </main>
  );
};

export default ConfigureGame;
