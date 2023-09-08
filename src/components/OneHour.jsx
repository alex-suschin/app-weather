import React from 'react'
import DayWeather from './DayWeather'

const OneHour = ({ weatherList, days, months, currDay }) => {
    return (
        <>
            {
                weatherList.map((itm, idx) => {
                    if (currDay === itm.dt_txt.split(' ')[0]) {
                        return <div className="today-hour-weather" key={idx}>
                            <div className="today-hour-weather__time">{itm.dt_txt.split(' ')[1].slice(0, -3)}</div>
                            <div className="day-weather__ico">
                                <img src={'https://openweathermap.org/img/wn/' + itm.weather[0].icon + '@2x' + '.png'} alt="" />
                            </div>
                            <div className="today-hour-weather__temp">{itm.main.temp.toFixed()} °C</div>
                            <div className="today-hour-weather__wind">Ветер:&nbsp;{itm.wind.speed.toFixed()}&nbsp;м/с</div>
                        </div>
                    }
                })
            }
        </>
    )
}

export default OneHour