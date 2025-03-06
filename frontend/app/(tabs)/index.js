import React, { useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AstrologyChart2D from '../../components/AstrologyChart2D/AstrologyChart2D';
import { HoroscopeContext } from '../../context/HoroscopeContext';
import { getCurrentHoroscope } from '../../services/horoscopeAPI';

const datetime = new Date("2021-07-26T16:30:00Z");
const latitude = 0.7128;  //New York
const longitude = -74.0060; //New York

export default function HoroscopeScreen() {
  const { horoscopeData, setHoroscopeData } = useContext(HoroscopeContext);
  
  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        console.log("Fetching Current Horoscope Data...");
        const data = await getCurrentHoroscope(datetime, latitude, longitude);
        setHoroscopeData(data);
        console.log("HOROSCOPE DATA: ", data)
        // console.log("Set Current Horoscope Data: ", data);
      } catch (error) {
        console.error("Error fetching horoscope:", error);
      }
    };

    fetchHoroscope();

  }, []);

  return (
    
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {horoscopeData ? <AstrologyChart2D chartData={horoscopeData}/> : <ActivityIndicator size="large" />}

      </View>
    
  );
}