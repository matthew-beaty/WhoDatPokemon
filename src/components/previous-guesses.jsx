import React from "react";
import { percentage } from "../helpers";
import { colors } from "../theme/colors";

const PreviousGuesses = ({ guesses }) => {
  const lastGuesses = guesses.slice(-10);
  const percentCorrect = percentage(
    lastGuesses.filter((g) => g.correct).length,
    lastGuesses.length
  );

  return (
    <aside
      style={{
        width: "300px",
        height: "300px",
        border: `4px ${colors.pokeBlue} solid`,
        borderRadius: "12px",
      }}
      className="last5"
    >
      <h3>{`Last 10 guesses (${percentCorrect}%) `}</h3>
      {lastGuesses.map((r) => (
        <div
          key={r.poke}
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "300px",
            backgroundColor: r.correct
              ? colors.correctGreen
              : colors.incorrectYellow,
          }}
        >
          <div>{r.poke}</div>
          <div>{r.correct ? "Correct" : "Incorrect"}</div>
        </div>
      ))}
    </aside>
  );
};

export default PreviousGuesses;
