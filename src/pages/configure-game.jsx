import React from "react";
import { useNavigate } from "react-router";
import { Checkbox, Card } from "semantic-ui-react";
import { colors } from "../theme/colors";

const formDefault = {
  exactMatch: false,
  shuffle: false,
  timed: false,
};

const Row = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
    }}
  >
    {children}
  </div>
);

const ConfigureGame = () => {
  const [form, setForm] = React.useState(formDefault);
  const { shuffle, timed, exactMatch } = form;

  const navigate = useNavigate();

  const toggleSetting = (name) => {
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
        <Card
          as="form"
          style={{
            width: "300px",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            border: `8px solid ${colors.pokeBlue}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <label htmlFor="exactMatch">Require exact match:</label>
            <Checkbox
              toggle
              id="exactMatch"
              checked={exactMatch}
              onClick={() => toggleSetting("exactMatch")}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <label htmlFor="shuffle">Shuffle:</label>
            <Checkbox
              toggle
              id="shuffle"
              checked={shuffle}
              onClick={() => toggleSetting("shuffle")}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <label htmlFor="timed">Timed:</label>
            <Checkbox
              toggle
              id="timed"
              checked={timed}
              onClick={() => toggleSetting("timed")}
            />
          </div>
          <button onClick={submit}>Lets play!</button>
        </Card>
      </section>
    </main>
  );
};

export default ConfigureGame;
