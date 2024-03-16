import React from 'react'
import './WeatherReport.css'

const WeatherReport = (props) => {

    console.log(props.isCelsius,'checkRalCel')


    const temperature = props.isCelsius ? Math.round(props.dataFetched.main.temp) : Math.round(props.dataFetched.main.temp * 9 / 5 + 32);
    const feelstemperature = props.isCelsius ? Math.round(props.dataFetched.main.feels_like) : Math.round(props.dataFetched.main.feels_like * 9 / 5 + 32);

  return (
    <div className='weather-main-box'>
      <div className='top-box'>
        <div>
    <p className='city'>{props.dataFetched.city}</p>
        <p className='weather-detail'>{props.dataFetched.weather[0].description}</p>
        </div>
     
    
      </div>
      <div className="bottom-box">
      <p className="temperature-div">{temperature}{props.isCelsius ? '°C' : '°F'}</p>
        <div className="details">
          <div className="parameter-row">
            <span className="detail-text">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
            {feelstemperature}{props.isCelsius ? '°C' : '°F'}
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind speed</span>
            <span className="parameter-value">{props.dataFetched.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{props.dataFetched.main.humidity}%</span>
          </div>
          
        </div>
      </div>

      
    </div>
  )
}

export default WeatherReport
