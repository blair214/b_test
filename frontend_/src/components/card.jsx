import React, { useState } from "react";
import "./card.css";

const typeColors = {
  Religion: "#a67c52",
  Science: "#5b9bd5",
  Military: "#c0504d",
  Art: "#70ad47",
  Herbs: "#9e480e",
  Gold: "#ffd700",
};

const Card = (props) => {
  const [flipped, setFlipped] = useState(false);
  const card = props.card ?? props;
  if (!card) return null;

  const { value, type, tieBreaker, isSpecial } = card;

  const backgroundColor = isSpecial
    ? "#ffd700"
    : typeColors[type] || "#fff";

  return (
    <div className="container" onClick={() => setFlipped(!flipped)}>
      <div className={`card ${flipped ? "flipped" : ""}`}>
        <div className="front">
          <div style={{ backgroundColor, padding: "10px", borderRadius: "8px" }}>
            <h4>{type}</h4>
            <p>Value: {value}</p>
            {!isSpecial && <p>Tiebreaker: {tieBreaker}</p>}
          </div>
        </div>
        <div className="back">
          <h1></h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
