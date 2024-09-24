import { CusNavBar } from "./components/CustomeNavBar/CusNavBar";
import Weather from "./components/Weather/Weather";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { WeatherProvider } from "./Context/WeatherContext";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique IDs

function App() {
  const [weathers, setWeathers] = useState(() => {
    // بازیابی داده‌ها از localStorage در اولین بارگذاری
    const savedWeathers = localStorage.getItem("weathers");
    return savedWeathers
      ? JSON.parse(savedWeathers)
      : [
          { id: uuidv4(), name: "Tehran", color: "rgb(155, 83, 83)" },
          { id: uuidv4(), name: "Abidjan", color: "rgb(107, 197, 107)" },
          { id: uuidv4(), name: "Sydney", color: "rgb(207, 193, 72)" },
          { id: uuidv4(), name: "Sapporo", color: "rgb(177, 93, 196)" },
        ];
  });

  const [weatherDataList, setWeatherDataList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchWeatherData = async (cities) => {
    try {
      const api_key = "8c74c3f09e8b9ffa24a20f0dd22ea5ff";
      const fetchedData = await Promise.all(
        cities.map(async ({ id, name, color }) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${api_key}`
          );
          const data = await response.json();
          if (data.cod === 200) {
            return {
              id,
              color,
              name,
              data: {
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon,
              },
            };
          }
          return null;
        })
      );
      setWeatherDataList(fetchedData.filter((item) => item !== null));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeatherData(weathers);
  }, [weathers]);

  // ذخیره اطلاعات در localStorage هنگام تغییر weathers
  useEffect(() => {
    localStorage.setItem("weathers", JSON.stringify(weathers));
  }, [weathers]);

  const addNewWeather = () => {
    if (searchValue.trim() !== "") {
      const newWeather = {
        id: uuidv4(),
        name: searchValue,
        color: "rgb(155, 83, 83)",
      };
      setWeathers([...weathers, newWeather]);
      setSearchValue("");
    }
  };

  const removeItem = (id) => {
    setWeathers(weathers.filter((item) => item.id !== id));
    setWeatherDataList(weatherDataList.filter((item) => item.id !== id));
  };

  const updateColor = (id, color) => {
    setWeathers((prevWeathers) =>
      prevWeathers.map((item) => (item.id === id ? { ...item, color } : item))
    );
    setWeatherDataList((prevWeatherDataList) =>
      prevWeatherDataList.map((item) =>
        item.id === id ? { ...item, color } : item
      )
    );
  };

  return (
    <WeatherProvider>
      <div>
        <div className="fixed-navbar">
          <CusNavBar
            addNewWeather={addNewWeather}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>

        <div className="app-container">
          <div className="row">
            {weatherDataList.map((item) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
                key={item.id}
              >
                <Weather
                  data={item.data}
                  id={item.id}
                  onRemove={removeItem}
                  nameLocation={item.name}
                  color={item.color}
                  onChangeColor={updateColor}
                />
              </div>
            ))}
          </div>
        </div>

        {/* فوتر که همیشه در پایین صفحه ثابت خواهد ماند */}
        <footer className="fixed-footer">
          <div className="footer-content">
            <p
              style={{
                color: "black",
                fontSize: "15px",
                alignContent: "center",
              }}
            >
              Design by
            </p>
            <p
              style={{
                color: "black",
                fontSize: "22px",
                alignContent: "center",
              }}
            >
              <a
                href="https://github.com/Alijamali"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ali Jamali
              </a>
            </p>
          </div>
        </footer>
      </div>
    </WeatherProvider>
  );
}

export default App;
