import { Line } from "react-native-svg";

const DegreeMarkers = ({ center, innerRadius, spacing = 2, majorSpacing = 10 }) => {
  return (
    <>
      {Array.from({ length: 360 / spacing }).map((_, i) => {
        const degree = i * spacing;
        const angle = (degree - 90) * (Math.PI / 180);
        const isMajor = degree % majorSpacing === 0;  // Major markers at 30°
        const r1 = innerRadius - (isMajor ? 10 : 5); // Major ticks longer
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