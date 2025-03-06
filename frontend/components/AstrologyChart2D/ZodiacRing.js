import React from "react";
import { View } from "react-native";
import { Path, Text } from "react-native-svg";

const ZodiacRing = ({ center, outerRadius, innerOuterRing, outerRingWidth, size }) => {
    const ZODIAC_SIGNS = [
        "♈", "♉", "♊", "♋", "♌", "♍",
        "♎", "♏", "♐", "♑", "♒", "♓"
    ];

    
    return (
        <View>
            {/* Outer Zodiac Ring */}
            {ZODIAC_SIGNS.map((sign, index) => {
                const startAngle = ((index * 30) - 90) * (Math.PI / 180);
                const endAngle = (((index + 1) * 30) - 90) * (Math.PI / 180);
    
                const x1 = center + outerRadius * Math.cos(startAngle);
                const y1 = center + outerRadius * Math.sin(startAngle);
                const x2 = center + outerRadius * Math.cos(endAngle);
                const y2 = center + outerRadius * Math.sin(endAngle);
                const x3 = center + innerOuterRing * Math.cos(endAngle);
                const y3 = center + innerOuterRing * Math.sin(endAngle);
                const x4 = center + innerOuterRing * Math.cos(startAngle);
                const y4 = center + innerOuterRing * Math.sin(startAngle);
    
                const pathD = `
                M ${x1},${y1}
                A ${outerRadius},${outerRadius} 0 0 1 ${x2},${y2}
                L ${x3},${y3}
                A ${innerOuterRing},${innerOuterRing} 0 0 0 ${x4},${y4}
                Z
                `;
                
                const fontSize = size * 0.05;
                const midAngle = ((index * 30) + 15 - 90) * (Math.PI / 180);
                const textX = center + (innerOuterRing + outerRingWidth / 2) * Math.cos(midAngle);
                const textY = center + (innerOuterRing + outerRingWidth / 2) * Math.sin(midAngle) + (fontSize/3); //Divide font size by 3 to get your offset to center the text

                return (
                <React.Fragment key={`zodiac-${sign}`}>
                    <Path d={pathD} fill="white" stroke="black" strokeWidth="1" />
                    <Text x={textX} y={textY} fontSize={fontSize} textAnchor="middle" fill="black">
                    {sign}
                    </Text>
                </React.Fragment>
                );
            })
            }
        </View>
    );
};

export default ZodiacRing;