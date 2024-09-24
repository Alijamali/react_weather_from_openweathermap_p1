import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "react-bootstrap";
import humidity_icon from "../../assets/humidity.png";
import wind_icon from "../../assets/wind.png";
import clear_sky_icon from "../../assets/lottie/clear_sky.json";
import rain_icon from "../../assets/lottie/rain.json";
import Snow_icon from "../../assets/lottie/Snow.json";
import rain_and_flash_icon from "../../assets/lottie/rain_and_flash.json";
import rain_sun_flower_icon from "../../assets/lottie/rain_sun_flower.json";
import clouds_icon from "../../assets/lottie/clouds.json";
import "./Weather.css";
import Lottie from "lottie-react";

const allIcon = {
  "01d": clear_sky_icon,
  "01n": clear_sky_icon,

  "02d": rain_sun_flower_icon,
  "02n": rain_sun_flower_icon,

  "03d": clouds_icon,
  "03n": clouds_icon,
  "04d": clouds_icon,
  "04n": clouds_icon,

  "09d": rain_sun_flower_icon,
  "09n": rain_sun_flower_icon,
  "010d": rain_icon,
  "010n": rain_icon,

  "011d": rain_and_flash_icon,
  "011n": rain_and_flash_icon,

  "013d": Snow_icon,
  "013n": Snow_icon,
};

function Weather({ data, onRemove, id, nameLocation, color, onChangeColor }) {
  const [showButton, setShowButton] = useState(false);

  return (
    <div
      className="component-item"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
      style={{ backgroundColor: color }}
    >
      <div className="weather">
        <div className="remove-button-container">
          {showButton && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(id);
              }}
              style={{ padding: "10px", backgroundColor: "red" }}
            >
              Remove
            </Button>
          )}
        </div>
        <div className="color-squares">
          <div
            className="color-square color1"
            onClick={() => onChangeColor(id, "rgb(155, 83, 83)")}
          ></div>
          <div
            className="color-square color2"
            onClick={() => onChangeColor(id, "rgb(107, 197, 107)")}
          ></div>
          <div
            className="color-square color3"
            onClick={() => onChangeColor(id, "rgb(207, 193, 72)")}
          ></div>
          <div
            className="color-square color4"
            onClick={() => onChangeColor(id, "rgb(177, 93, 196)")}
          ></div>
        </div>
        <Lottie
          animationData={allIcon[data.icon] || clear_sky_icon}
          className="weather-icon"
        />
        <p className="temperature">{data.temp}°C</p>
        <p className="location">{data.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{data.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{data.windSpeed} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Weather.propTypes = {
  data: PropTypes.shape({
    humidity: PropTypes.number,
    windSpeed: PropTypes.number,
    temp: PropTypes.number,
    location: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  nameLocation: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onChangeColor: PropTypes.func.isRequired,
};

export default Weather;
