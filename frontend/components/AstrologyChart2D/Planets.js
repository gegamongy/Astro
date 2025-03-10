import React from "react"
import { View } from "react-native";
import { Text } from "react-native-svg";

// Map planet names to their respective symbols
const planetSymbols = {
    Sun: "☉",
    Moon: "☽",
    Mercury: "☿",
    Venus: "♀",
    Mars: "♂",
    Jupiter: "♃",
    Saturn: "♄",
    Uranus: "♅",
    Neptune: "♆",
    Pluto: "♇"
};

const Planets = ({ center, planetRadius, planetPositions, size}) => {
    // Convert `planet_positions` object into an array format
    const planets = Object.entries(planetPositions || {}).map(([name, data]) => ({
        name: planetSymbols[name] || name,  // Fallback in case a name is missing
        degree: data.absolute_degree
    }));

    const fontSize = size * 0.05;

    return (
        <View>
            {planets.map((planet, index) => {
                const angle = (planet.degree - 90) * (Math.PI / 180);
                const x = center + planetRadius * Math.cos(angle);
                const y = center + planetRadius * Math.sin(angle) + fontSize/3;

                return (
                <Text
                    key={`planet-${index}`}
                    x={x}
                    y={y}
                    fontSize={fontSize}
                    textAnchor="middle"
                    fill="black"
                >
                    {planet.name}
                </Text>
                );
            })}
        </View>
    )
}

export default Planets;