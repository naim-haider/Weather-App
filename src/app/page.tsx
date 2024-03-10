"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import DehazeIcon from "@mui/icons-material/Dehaze";
import VapingRoomsIcon from "@mui/icons-material/VapingRooms";
import CloudIcon from "@mui/icons-material/Cloud";

export default function Home() {
  const [place, setPlace] = useState("howrah");
  const [placeData, setPlaceData] = useState<any>(null);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    // hour12:true,
  });
  let Weather_Api_Key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const getWeatherData = async () => {
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=Weather_Api_Key

    if (place && place.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${Weather_Api_Key}`;
        let res = await fetch(url);
        let data = await res.json();
        console.log("GET WEATHER DATA RESPONSE -> ", data);
        setPlaceData(data);
      } catch (error) {
        console.log("error in getWeatherData -> ", error);
      }
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);
  return (
    <div className={styles.outerdiv}>
      <div className={styles.searchbar}>
        <input
          type="search"
          placeholder="City Name"
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={getWeatherData}>
          <SearchIcon />
        </button>
      </div>
      {placeData ? (
        <div className={styles.row}>
          <div className={styles.section1}>
            <div className={styles.section11}>
              {placeData?.weather[0]?.main === "Clouds" && (
                <FilterDramaIcon className={styles.weathericon} />
              )}
              {placeData?.weather[0]?.main === "Haze" && (
                <DehazeIcon className={styles.weathericon} />
              )}
              {placeData?.weather[0]?.main === "Smoke" && (
                <VapingRoomsIcon className={styles.weathericon} />
              )}
              {placeData?.weather[0]?.main === "Mist" && (
                <CloudIcon className={styles.weathericon} />
              )}

              <p className={styles.temp}>
                {(placeData?.main.temp - 273.15).toFixed(1)} <span>°C</span>
              </p>
            </div>
            <div className={styles.section11}>
              <p className={styles.city}>{placeData?.name}</p>
              <p className={styles.weathertype}>{placeData?.weather[0].main}</p>
            </div>
          </div>

          <div className={styles.timediv}>
            <p className={styles.time}>{currentTime}</p>
          </div>
        </div>
      ) : (
        <>Place is not found</>
      )}

      {placeData ? (
        <div className={styles.section2}>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature</p>
            <p className={styles.head2}>
              {(placeData?.main.temp - 273.15).toFixed(1)} °C
            </p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Min</p>
            <p className={styles.head2}>
              {(placeData?.main.temp_min - 273.15).toFixed(1)} °C
            </p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Max</p>
            <p className={styles.head2}>
              {(placeData?.main.temp_max - 273.15).toFixed(1)} °C
            </p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Humidity</p>
            <p className={styles.head2}>{placeData?.main.humidity}</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Pressure</p>
            <p className={styles.head2}>{placeData?.main.pressure}</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Visibility</p>
            <p className={styles.head2}>{placeData?.visibility}</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Wind Speed</p>
            <p className={styles.head2}>{placeData?.wind.speed} km/hr</p>
          </div>
        </div>
      ) : (
        <>Place is not found</>
      )}
    </div>
  );
}
