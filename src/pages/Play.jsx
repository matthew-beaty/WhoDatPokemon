import React from "react";
import { getRandomPokeNum, getPokeUrl } from "../helpers";
import PreviousGuesses from "../components/previous-guesses";
import Stats from "../components/stats";

const RevealStates = {
  Unplayed: "Unplayed",
  Correct: "Correct",
  Incorrect: "Incorrect",
};

export default function Play(props) {
  const [currentPoke, setCurrentPoke] = React.useState({});
  const [revealPoke, setRevealPoke] = React.useState(RevealStates.Unplayed);
  const [inputValue, setInputValue] = React.useState("");

  const [guesses, setGuesses] = React.useState([]);

  const [streak, setStreak] = React.useState(0);
  const [correctTotal, setCorrectTotal] = React.useState(0);
  const [incorrectTotal, setIncorrectTotal] = React.useState(0);

  let textInput = null;

  // on page render, fetch a new poke
  React.useEffect(() => {
    fetch(getPokeUrl(getRandomPokeNum()))
      .then((res) => res.json())
      .then((data) => setCurrentPoke(data));
  }, []);

  React.useEffect(() => {
    if (textInput) textInput.focus();
  });

  const onChange = (e) => {
    const val = e.target.value;

    setInputValue(val);

    if (val === currentPoke.name) {
      setRevealPoke(RevealStates.Correct);
      setStreak(streak + 1);
      setCorrectTotal(correctTotal + 1);
      setGuesses([...guesses, { poke: currentPoke.name, correct: true }]);
    }
  };

  const nextPoke = () => {
    setRevealPoke(RevealStates.Unplayed);
    setInputValue("");

    fetch(getPokeUrl(getRandomPokeNum()))
      .then((res) => res.json())
      .then((data) => setCurrentPoke(data));
  };

  const giveUp = () => {
    setRevealPoke(RevealStates.Incorrect);
    setStreak(0);
    setIncorrectTotal(incorrectTotal + 1);
    setGuesses([...guesses, { poke: currentPoke.name, correct: false }]);
  };

  return (
    <>
      <main
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Stats
          streak={streak}
          correctTotal={correctTotal}
          incorrectTotal={incorrectTotal}
        />
        <div
          style={{
            width: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {currentPoke.name && (
            <img
              style={{ width: "200px" }}
              className={revealPoke === RevealStates.Unplayed ? "shaded" : ""}
              src={currentPoke.sprites.front_default}
              alt="a pokemon"
            ></img>
          )}

          {revealPoke === RevealStates.Unplayed && (
            <div>
              <input
                autoFocus
                type="text"
                value={inputValue}
                onChange={onChange}
                onKeyUp={(e) => {
                  if (e.key === "Enter") giveUp();
                }}
                disabled={revealPoke !== RevealStates.Unplayed}
              ></input>
            </div>
          )}

          {revealPoke === RevealStates.Correct && (
            <>
              <h2>That's right! It's {currentPoke.name}!</h2>
              <button onClick={nextPoke}>Next pokemon</button>
            </>
          )}

          {revealPoke === RevealStates.Incorrect && (
            <>
              <h2>Good try! It's {currentPoke.name}!</h2>
              <button
                autofocus
                ref={(button) => {
                  textInput = button;
                }}
                onClick={nextPoke}
              >
                Next pokemon
              </button>
            </>
          )}

          <div>
            {revealPoke === RevealStates.Unplayed && (
              <button onClick={giveUp}>IDK, who is it?!</button>
            )}
          </div>
        </div>

        <PreviousGuesses guesses={guesses} />
      </main>
    </>
  );
}
