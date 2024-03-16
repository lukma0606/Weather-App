import logo from './logo.svg';
import './App.css';
import Search from './Component/Search';
import WeatherReport from './Component/WeatherReport/WeatherReport';
import { weather_Api_Key, weather_Api_Url } from './Component/apiFolder';
import { useState } from 'react';

function App() {

  const [weatherData,setWeatherData] = useState(null)
  const [isCelsius, setIsCelsius] = useState(true); // State for temperature unit
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleSearchData =(searchData)=>{
    const [lat, lon] = searchData.value.split(" ");
    const weatherFetchingApi = fetch(`${weather_Api_Url}/weather?lat=${lat}&lon=${lon}&appid=${weather_Api_Key}&units=metric`)
  
    Promise.all([weatherFetchingApi])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      if (weatherResponse.cod === "404") {
        // City not found, set error message
        setErrorMessage("Please enter another city.");
        setWeatherData(null);
      } else {
        // City found, update weather data
        setErrorMessage("");
        setWeatherData({ city: searchData.label, ...weatherResponse });
      }
    })
    .catch(error => {
      // Error occurred during fetch
      console.error("Error fetching weather data:", error);
      setErrorMessage("An error occurred. Please try again later.");
      setWeatherData(null);
    });
  }

  console.log(weatherData,'CheckForcast')

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="weather-app-container">
      <Search onSearchChangeData={handleSearchData}/>
      {errorMessage && <p>{errorMessage}</p>}
      { weatherData && 
        <>
          <WeatherReport dataFetched={weatherData} isCelsius={isCelsius}/>
         <div className='btn-parent'>
          <button className='btn' onClick={toggleTemperatureUnit}>
            {isCelsius ? 'Show in Fahrenheit' : 'Show in Celsius'}
          </button>
          </div>
        </>
      }
    </div>
  );
}

export default App;
