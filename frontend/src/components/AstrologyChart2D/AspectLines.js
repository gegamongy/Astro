import React from "react";
import { Line } from "react-native-svg";

const ASPECTS = [
  { name: "Conjunction", angle: 0, color: "gold" },
  { name: "Opposition", angle: 180, color: "red" },
  { name: "Trine", angle: 120, color: "blue" },
  { name: "Square", angle: 90, color: "purple" },
  { name: "Sextile", angle: 60, color: "green" },
];

const AspectLines = ({ center, radius, planetPositions }) => {
  const aspectTolerance = 5; // Allow slight deviation for aspects
  const planetArray = Object.entries(planetPositions).map(([name, data]) => ({
    name,
    angle: data.absolute_degree, // Extract absolute degree
  }));

  const aspectLines = [];

  for (let i = 0; i < planetArray.length; i++) {
    for (let j = i + 1; j < planetArray.length; j++) {
      const angle1 = planetArray[i].angle;
      const angle2 = planetArray[j].angle;
      const angleDifference = Math.abs(angle1 - angle2) % 360;

      // Check if angle matches any aspect
      const aspect = ASPECTS.find(
        (a) =>
          Math.abs(angleDifference - a.angle) <= aspectTolerance ||
          Math.abs(angleDifference - (360 - a.angle)) <= aspectTolerance
      );

      if (aspect) {
        // Convert angles to coordinates
        const x1 = center + radius * Math.cos((angle1 - 90) * (Math.PI / 180));
        const y1 = center + radius * Math.sin((angle1 - 90) * (Math.PI / 180));
        const x2 = center + radius * Math.cos((angle2 - 90) * (Math.PI / 180));
        const y2 = center + radius * Math.sin((angle2 - 90) * (Math.PI / 180));

        aspectLines.push(
          <Line
            key={`aspect-${i}-${j}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={aspect.color}
            strokeWidth="1"
          />
        );
      }
    }
  }

  return <>{aspectLines}</>;
};

export default AspectLines;
