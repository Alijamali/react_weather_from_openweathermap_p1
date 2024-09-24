import { Navbar, Container, Form, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import drizzle_icon from "../../assets/drizzle.png";
import { useState } from "react";
import { LocationsList } from "../../Data/listLocation";
import "./CusNavBar.css";
import CusClock from "../Clock/CusClock";

export const CusNavBar = ({ addNewWeather, searchValue, setSearchValue }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    if (inputValue) {
      const filteredSuggestions = LocationsList.filter(
        (option) =>
          option.toLowerCase().slice(0, inputValue.length) ===
          inputValue.toLowerCase() // بررسی حروف اول، دوم و سوم
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setSearchValue(suggestion);
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("enter click");
      addNewWeather();
    }
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="custom-navbar navbar-expand-lg"
      style={{ justifyContent: "center", position: "relative" }} // اطمینان از position relative
    >
      <Container
        style={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: "10px",
        }}
      >
        {/* لوگو و نام برند */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexShrink: 0,
          }}
        >
          <img
            src={drizzle_icon} // لینک لوگو
            alt="Weather Logo"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
            }}
          />
          <span className="brand-name">Weather App</span>
        </div>

        <CusClock />
        {/* نوار جستجو */}
        <div className="d-flex position-relative">
          <Form
            className="d-flex flex-grow-1"
            style={{ gap: "5px", maxWidth: "400px" }}
          >
            <Form.Control
              type="search"
              onChange={handleChange}
              placeholder="Add Card By Location Name..."
              className="me-2"
              aria-label="Search"
              value={searchValue}
              onKeyDown={handleKeyPress}
              style={{ width: "100%", maxWidth: "300px" }} // اطمینان از اندازه
            />
            <Button
              onClick={addNewWeather}
              variant="outline-success"
              className="d-flex align-items-center"
            >
              <FaPlus />
            </Button>
          </Form>
          {/* لیست پیشنهادی در همین دایو */}
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </Navbar>
  );
};
