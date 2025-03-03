import React, { createContext, useState } from "react";

// Create Context
export const HoroscopeContext = createContext();

// Context Provider Component
export const HoroscopeProvider = ({ children }) => {
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <HoroscopeContext.Provider value={{ horoscopeData, setHoroscopeData, loading }}>
      {children}
    </HoroscopeContext.Provider>
  );
};
