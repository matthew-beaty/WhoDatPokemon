import React from "react";
import { percentage } from "../helpers/index";
import { colors } from "../theme/colors";

const Stats = ({ streak, correctTotal, incorrectTotal }) => {
  return (
    <aside
      style={{
        width: "300px",
        height: "300px",
        border: `4px ${colors.pokeBlue} solid`,
        borderRadius: "12px",
      }}
    >
      <div>Streak: {streak}</div>
      <div>Total Correct: {correctTotal}</div>
      <div>Total Incorrect: {incorrectTotal}</div>
      <div>
        {`Guess Rate: ${percentage(
          correctTotal,
          correctTotal + incorrectTotal
        )}%`}
      </div>
    </aside>
  );
};

export default Stats;
