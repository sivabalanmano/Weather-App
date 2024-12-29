import React, { useEffect, useState } from "react";
import Search from "../search";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherInfo, setWeathetInfo] = useState(null);

  async function fetchWeather(param) {
    setLoading(true);
    try {
      const ApiKey = "e580ae93d20d1f840ce01155784ceb1c";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${ApiKey}`
      );
      const data = await res.json();
      console.log(data);
      if (data) {
        setLoading(false);
        setWeathetInfo(data);
      }
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  }
  function getCurrentData() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchWeather("bangalur");
  }, []);

  function handleSeach() {
    fetchWeather(search);
    setSearch('')
  }
  return (
    <div>
      <Search search={search} setSearch={setSearch} handleSeach={handleSeach} />
      {loading ? (
        <div className="loading">Loading.......</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherInfo?.name}, <span>{weatherInfo?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentData()}</span>
          </div>
          <div className="temp">{weatherInfo?.main?.temp}</div>
          <p className="discription">
            {weatherInfo && weatherInfo.weather && weatherInfo.weather[0]
              ? weatherInfo.weather[0].description
              : ''}
          </p>
          <div className="weather-info">
            <div className="coloumn">
              <div>
                <p className="wind">{weatherInfo?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div  className="coloumn">
              <div>
                <p className="humidity">{weatherInfo?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
