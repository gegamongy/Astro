import React from "react"
import { View } from "react-native";
import { Path, Text } from "react-native-svg";

const HouseRing = ({ center, outerInnerRing, innerRadius, innerRingWidth, houses, size }) => {
  console.log('HouseRing.js: ', houses );
  
  const houseCusps = Object.keys(houses) // Get house numbers
  .sort((a, b) => a - b) // Ensure order from 1 to 12
  .map((key) => houses[key]); // Extract angles

  return (
    <View>
        {/* Inner House Ring with independent divisions */}
        {houseCusps.map((angle, index) => {
          const startAngle = (angle - 90) * (Math.PI / 180);
          const endAngle = ((houseCusps[(index + 1) % 12]) - 90) * (Math.PI / 180);

          const x1 = center + outerInnerRing * Math.cos(startAngle);
          const y1 = center + outerInnerRing * Math.sin(startAngle);
          const x2 = center + outerInnerRing * Math.cos(endAngle);
          const y2 = center + outerInnerRing * Math.sin(endAngle);
          const x3 = center + innerRadius * Math.cos(endAngle);
          const y3 = center + innerRadius * Math.sin(endAngle);
          const x4 = center + innerRadius * Math.cos(startAngle);
          const y4 = center + innerRadius * Math.sin(startAngle);

          const pathD = `
            M ${x1},${y1}
            A ${outerInnerRing},${outerInnerRing} 0 0 1 ${x2},${y2}
            L ${x3},${y3}
            A ${innerRadius},${innerRadius} 0 0 0 ${x4},${y4}
            Z
          `;

          const nextIndex = (index + 1) % 12;
          const houseStart = houseCusps[index]
          let houseEnd = houseCusps[nextIndex]

          // Handle wraparound at 0° (e.g., from 330° to 10°)
          if (houseEnd < houseStart) {
            houseEnd += 360;
          }

          const fontSize = size * 0.05;
          const houseMidpoint = (houseStart + houseEnd) / 2;
          const midAngle = (houseMidpoint - 90) * (Math.PI / 180);
          const textX = center + (innerRadius + innerRingWidth / 2) * Math.cos(midAngle);
          const textY = center + (innerRadius + innerRingWidth / 2) * Math.sin(midAngle) + fontSize/3;

          return (
            <React.Fragment key={`house-${index}`}>
              <Path d={pathD} fill="white" stroke="black" strokeWidth="1" />
          
              {/* Calculate position for house number */}
              <Text
                x={textX}
                y={textY}
                fontSize={fontSize}
                textAnchor="middle"
                fill="black"
              >
                {index + 1}
              </Text>
            </React.Fragment>
          );
        })}
    </View>
  )
}

export default HouseRing;