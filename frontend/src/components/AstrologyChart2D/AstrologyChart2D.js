import { React, useContext } from "react";
import { View } from "react-native";
import Svg, { Circle, Line, Text, Path } from "react-native-svg";
import ZodiacRing from "./ZodiacRing"
import HouseRing from "./HouseRing"
import DegreeMarkers from "./DegreeMarkers";
import Planets from "./Planets"
import AspectLines from "./AspectLines";
import { HoroscopeContext } from "../../context/HoroscopeContext";

const AstrologyChart2D = ({ size = 350, outerRingWidth = 35, innerRingWidth = 20 }) => {
  const { horoscopeData } = useContext(HoroscopeContext);

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

  const planetPositions = horoscopeData?.planet_positions;
  const houses = horoscopeData?.houses;
 
  const degreeMarkerSpacing = 2;
  const majorDegreeMarkerSpacing = 10;
  
  const planetRadius = innerRadius - 20; // Keep planets inside the house ring



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
          spacing={degreeMarkerSpacing}
          majorSpacing={majorDegreeMarkerSpacing}
        />
        

        <ZodiacRing 
          center={center} 
          outerRadius={outerRadius}
          innerOuterRing={innerOuterRing}
          outerRingWidth={outerRingWidth}
        />

        <HouseRing
          center={center}
          outerInnerRing={outerInnerRing}
          innerRadius={innerRadius}
          innerRingWidth={innerRingWidth}
          houses={houses}
        />
        
        

        <Planets
          center={center}
          planetRadius={planetRadius}
          planetPositions={planetPositions}
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
