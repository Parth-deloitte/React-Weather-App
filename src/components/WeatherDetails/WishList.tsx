import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, useParams } from "react-router-dom";

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./WishList.css";
import WeatherDetails from "./WeatherDetails";
import { City, RootState, WeatherData } from "../weatherTypes";
import plusicon from "../../assets/Plus.png";
import { useState } from "react";
import { addWeather, deleteWeather } from "../WeatherRedux/actions/weather";
import { connect } from "react-redux";
import { Dispatch } from "redux";
// import { addWeather, deleteWeatherData } from

interface wishListProps {
  reduxWeatherData: WeatherData[];
  addWeather: (weather: WeatherData) => void;
  deleteWeather: (name: string) => void;
}
const WishList: React.FC<wishListProps> = ({
  reduxWeatherData,
  addWeather,
  deleteWeather,
}) => {
  const { name } = useParams<{ name?: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData>({
    name: "",
    weather: [],
    main: { temp: 0, humidity: 0, pressure: 0 },
    sys: {
      sunrise: 0,
      sunset: 0,
    },

    timezone: 0,
    rain: {
      "1h": 0,
    },
  });

  const city: City = {
    cityName: name,
  };

  const handleWeatherDataReceived = (data: WeatherData) => {
    setWeatherData(data);
    console.log(data);
  };
  const handleAddToList = () => {
    // console.log(weatherData);
    addWeather(weatherData);
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-function">
        <Link to="/weatherApp">
          <div className="backbutton">
            <FontAwesomeIcon icon={faAngleLeft} className="less-than" />
            <a style={{ textDecoration: "none", color: "#0170FE" }} href="/">
              BACK
            </a>
          </div>
        </Link>

        {/* <AddToList name={weatherData.name} weatherData={weatherData} /> */}

        <div className="add-to-list">
          {reduxWeatherData.find((data) => data.name === name) ? (
            <div>
              <button
                style={{
                  backgroundColor: "#009456",
                  width: "150px",
                  height: "50px",
                  color: "white",
                  fontWeight: 700,
                  marginRight: "30px",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Successfully Added
              </button>

              <button
                style={{
                  backgroundColor: "#EC7272",
                  width: "150px",
                  height: "50px",
                  color: "white",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "10px",
                }}
                onClick={(event) => {
                  if (name) return deleteWeather(name);
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="add">
              <button onClick={handleAddToList} className="add-list-btn">
                Add to List
              </button>
              <img src={plusicon} alt="Plus Icon" className="icon" />
            </div>
          )}
        </div>
      </div>

      <WeatherDetails
        city={city}
        onWeatherDataRecieved={handleWeatherDataReceived}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { reduxWeatherData: state.weatherReducer };
};
// mapping addWeather to reducerFunction that contains addWeather
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addWeather: (weather: WeatherData) => dispatch(addWeather(weather)),
  deleteWeather: (name: string) => dispatch(deleteWeather(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
