import { createContext, useState } from "react";

export const WeatherContext = createContext({
  weatherList: [],
  addLocationToList: () => {},
});

export function WeatherProvider({ children }) {
  const [weatherLocations, setWeatherLocations] = useState([]);

  function addLocationToList(name) {
    setWeatherLocations([...weatherLocations, { name: name }]);
    console.log(weatherLocations[weatherLocations.length - 1]);
  }

  const ContextValue = {
    weatherList: weatherLocations,
    addLocationToList,
  };
  return (
    <WeatherContext.Provider value={ContextValue}>
      {children}
    </WeatherContext.Provider>
  );
}
