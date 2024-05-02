import React from "react";

export default function TeamView({ team }) {
  return (
    <div
      id="team-view"
      className="display-none"
      style={{
        width: "30%",
        backgroundColor: "var(--dim-white)",
      }}
    >
      {team !== null &&
        team !== undefined &&
        team.selectedCoins.length > 0 &&
        team.selectedCoins.map((coin, index) => {
          return <p>{coin.name}</p>;
        })}
    </div>
  );
}
