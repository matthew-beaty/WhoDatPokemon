import React from "react";

import Toggle from "../components/toggle";

const formDefault = {
  exactMatch: false,
  shuffle: false,
  timed: false,
};

const Setting = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    {children}
  </div>
);

const ConfigureGame = () => {
  const [form, setForm] = React.useState(formDefault);
  const { shuffle, timed, exactMatch } = form;

  const toggleSetting = ({ target }) => {
    const { name } = target;
    const value = form[name];

    setForm({ ...form, [name]: !value });
  };

  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <h1>Game Settings</h1>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <form
          style={{ width: "300px", display: "flex", flexDirection: "column" }}
        >
          <Setting>
            Require exact match:
            <Toggle
              name="exactMatch"
              checked={exactMatch}
              onChange={toggleSetting}
            ></Toggle>
          </Setting>

          <Setting>
            Shuffle:
            <Toggle
              name="shuffle"
              checked={shuffle}
              onChange={toggleSetting}
            ></Toggle>
          </Setting>

          <Setting>
            Timed:
            <Toggle
              name="timed"
              checked={timed}
              onChange={toggleSetting}
            ></Toggle>
          </Setting>

          <button onClick={submit}>Lets play!</button>
        </form>
      </section>
    </main>
  );
};

export default ConfigureGame;
