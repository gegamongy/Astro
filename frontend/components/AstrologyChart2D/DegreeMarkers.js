import { Line } from "react-native-svg";

const DegreeMarkers = ({ center, size, innerRadius, spacing = 2, majorSpacing = 10 }) => {
  return (
    <>
      {Array.from({ length: 360 / spacing }).map((_, i) => {
        const degree = i * spacing;
        const angle = (degree - 90) * (Math.PI / 180);
        const isMajor = degree % majorSpacing === 0;  // Major markers at 30°
        const tickLength = size * 0.02; // Scale tick length based on chart size
        const majorTickLength = size * 0.04; // Major ticks are longer

        const r1 = innerRadius - (isMajor ? majorTickLength : tickLength); // Adjust length proportionally
        const r2 = innerRadius;

        const x1 = center + r1 * Math.cos(angle);
        const y1 = center + r1 * Math.sin(angle);
        const x2 = center + r2 * Math.cos(angle);
        const y2 = center + r2 * Math.sin(angle);

        return <Line key={`marker-${degree}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="1" />;
      })}
    </>
  );
};

export default DegreeMarkers;