import React from "react";
import { getRandomPokeNum, getPokeUrl } from "../helpers";
import PreviousGuesses from "../components/previous-guesses";
import Stats from "../components/stats";
import { Button, Input } from "semantic-ui-react";

import Fuse from "fuse.js";

const RevealStates = {
  Unplayed: "Unplayed",
  Correct: "Correct",
  Incorrect: "Incorrect",
};

const settings = {
  fuzzyMatch: false,
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

  const guess = (e) => {
    e.preventDefault();

    let isFuzzyMatch = false;

    // For fuzzy match
    if (settings.fuzzyMatch) {
      const fuse = new Fuse([currentPoke.name], { threshold: 0.2 });
      const result = fuse.search(inputValue);

      if (
        Math.abs(inputValue.length - currentPoke.name.length) <= 2 &&
        result.length > 0
      )
        isFuzzyMatch = true;
    }

    const isCorrect = settings.fuzzyMatch
      ? isFuzzyMatch
      : inputValue === currentPoke.name;

    // Guess
    if (isCorrect) {
      setRevealPoke(RevealStates.Correct);
      setStreak(streak + 1);
      setCorrectTotal(correctTotal + 1);
      setGuesses([...guesses, { poke: currentPoke.name, correct: true }]);
    } else {
      giveUp();
    }
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
            <form onSubmit={guess}>
              <Input
                autoFocus
                action="Guess"
                type="text"
                value={inputValue}
                onChange={onChange}
                onKeyUp={(e) => {
                  if (e.key === "Enter") guess(e);
                }}
                disabled={revealPoke !== RevealStates.Unplayed}
              ></Input>
            </form>
          )}

          {revealPoke === RevealStates.Correct && (
            <>
              <h2>That's right! It's {currentPoke.name}!</h2>
              <Button onClick={nextPoke}>Next pokemon</Button>
            </>
          )}

          {revealPoke === RevealStates.Incorrect && (
            <>
              <h2>Good try! It's {currentPoke.name}!</h2>
              <Button
                autofocus
                ref={(button) => {
                  textInput = button;
                }}
                onClick={nextPoke}
              >
                Next pokemon
              </Button>
            </>
          )}

          <div>
            {revealPoke === RevealStates.Unplayed && (
              <Button onClick={giveUp}>IDK, who is it?!</Button>
            )}
          </div>
        </div>

        <PreviousGuesses guesses={guesses} />
      </main>
    </>
  );
}
