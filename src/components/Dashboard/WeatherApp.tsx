import React, { useEffect, useState } from "react";

import "./WeatherApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import DefaultWatchlist from "./DefaultWatchlist";
import axios from "axios";

import { RootState, WeatherData } from "../weatherTypes";
import WeatherCard from "./WeatherCard";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import { deleteWeather } from "../WeatherRedux/actions/weather";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
let cities: string[] = [
  "Mumbai",
  "Bangalore",
  // Add more initial city names as needed
];

interface WeatherAppProps {
  reduxWeatherData: WeatherData[];
  deleteWeather: (id: string) => void;
}
const WeatherApp: React.FC<WeatherAppProps> = ({
  reduxWeatherData,
  deleteWeather,
}) => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [searchedCities, setSearchedCities] = useState<string[]>([]);
  const [reduxDataLength, setreduxDataLength] = useState<number>(
    reduxWeatherData.length
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setCity(value);
    const filteredCities: string[] = cities.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedCities(filteredCities);
  };

  useEffect(() => {
    //console.log("KL");
    setreduxDataLength(reduxWeatherData.length);
  }, [reduxWeatherData]);
  const fetchData = async (city: string) => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f5427a0f5207b76cb82078bf8d15c9cb`
      );
      // console.log(response.data);
      if (city && !cities.includes(city)) {
        cities.push(city);
      }

      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  const handleIconClick = () => {
    const enteredCity = city.trim();
    fetchData(enteredCity);
  };
  const handleSuggestionClick = (suggestion: string) => {
    setCity(suggestion);
  };
  const handleInputClick = () => {
    setSearchedCities([...cities]);
  };

  return (
    <div className="weather-container">
      <div className="input-feild">
        <input
          className="location"
          type="text"
          value={city}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder="Search Location"
        />
        <button className="search-btn" onClick={handleIconClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="suggestions">
        {searchedCities.map((suggestion, index) => (
          <div
            key={index}
            className="suggestion-item"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>

      <div className="display-section">
        {weatherData && <WeatherCard data={weatherData} />}
        {reduxDataLength === 0 && !city && <DefaultWatchlist />}
        {reduxDataLength !== 0 && (
          <Splide options={{ type: "loop", perPage: 1 }}>
            {reduxWeatherData.map((data) => {
              return (
                <SplideSlide className="redux-list" key={data.name}>
                  <button
                    className="remove-btn"
                    onClick={(event) => deleteWeather(data.name)}
                  >
                    Remove
                  </button>
                  <WeatherDetails city={data.name} />
                </SplideSlide>
              );
            })}
          </Splide>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  console.log(state.weatherReducer);
  return { reduxWeatherData: state.weatherReducer };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteWeather: (id: string) => dispatch(deleteWeather(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherApp);
