import { React, useContext } from "react";
import { View } from "react-native";
import Svg, { Circle, Line, Text, Path } from "react-native-svg";
import ZodiacRing from "./ZodiacRing"
import HouseRing from "./HouseRing"
import DegreeMarkers from "./DegreeMarkers";
import Planets from "./Planets"
import AspectLines from "./AspectLines";
import { HoroscopeContext } from "../../context/HoroscopeContext";

const AstrologyChart2D = ({ chartData, size = 300 }) => {
  
  if (!chartData) return null; // Handle missing data
  
  // const { horoscopeData } = useContext(HoroscopeContext);

   // Scale all components based on size
   const outerRingWidth = size * 0.1; // 10% of size
   const innerRingWidth = size * 0.06; // 6% of size
  
  //  const planetRadius = radius * 0.1; // Keep planets inside the house ring
  //  const aspectRadius = radius * 0.6; // Scale aspect lines too
 
  const radius = size / 2;
  const center = radius;

  // Outer Zodiac Ring
  const outerRadius = radius;
  const innerOuterRing = outerRadius - outerRingWidth;

  // Inner House Ring
  const innerRingSpacing = 0;
  const outerInnerRing = innerOuterRing + - innerRingSpacing;
  const innerRadius = outerInnerRing - innerRingWidth;

  // const houseCusps = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] // Default evenly spaced

  const planetPositions = chartData.planet_positions;
  const houses = chartData.houses;
  
  const planetRadius = innerRadius - size * 0.08; // Keep planets inside the house ring



  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg 
        width={size+ 20} 
        height={size + 20} 
        viewBox={`-10 -10 ${size + 20} ${size + 20}`} //Padding so that the SVG Box doesnt get cut off
        > 

        <Circle
          cx={center}
          cy={center}
          r={innerRadius}  // Slightly smaller than the house ring
          fill="rgba(255, 255, 255, 1.0)"  // Light translucent color
          stroke="black"
          strokeWidth="1"
        />   

        <DegreeMarkers
          center={center}
          innerRadius={innerRadius}
          size={size}
        />
        

        <ZodiacRing 
          center={center} 
          outerRadius={outerRadius}
          innerOuterRing={innerOuterRing}
          outerRingWidth={outerRingWidth}
          size={size}
        />

        <HouseRing
          center={center}
          outerInnerRing={outerInnerRing}
          innerRadius={innerRadius}
          innerRingWidth={innerRingWidth}
          houses={houses}
          size={size}
        />
        

        <Planets
          center={center}
          planetRadius={planetRadius}
          planetPositions={planetPositions}
          size={size}
        />

        <AspectLines
          center={center}
          radius={planetRadius}
          planetPositions={planetPositions}
        />
      </Svg>
    </View>
  );
};

export default AstrologyChart2D;
