import React from 'react'
import wind from "../assets/img/wind-ico.svg";

const DayWeather = (props) => {
    return (
        // <div className="day-weather">
        //     <div className="day-weather__name-day">
        //         <div>
        //             <span>{new Date(props.item).getDate()}</span>
        //             <span>{props.months[new Date(props.date).getMonth()]}</span>
        //         </div>
        //         <span>{props.days[new Date(props.date).getDay()]}</span>
        //     </div>

        //     <div className="day-weather__info">
        //         <div className="day-weather__ico">
        //             <img src={'https://openweathermap.org/img/wn/' + props.item.weather[0].icon + '@2x' + '.png'} alt="" />
        //         </div>
        //         <div className="day-weather__temp">{props.item.main.temp.toFixed()}°C</div>
        //     </div>

        //     <div className="day-weather__bottom">
        //         <p>Ветер: {props.item.wind.speed.toFixed()} м/c</p>
        //         <p>{props.item.dt_txt.split(' ')[1].slice(0, -3)}</p>
        //     </div>

        //     {
        //         weatherList.map((itm, idx) => {
        //             if (currDay === itm.dt_txt.split(' ')[0]) {
        //                 return <div className="today-hour-weather">
        //                     <div className="today-hour-weather__time">{itm.dt_txt.split(' ')[1].slice(0, -3)}</div>
        //                     <div className="day-weather__ico">
        //                         <img src={'https://openweathermap.org/img/wn/' + itm.weather[0].icon + '@2x' + '.png'} alt="" />
        //                     </div>
        //                     <div className="today-hour-weather__temp">{itm.main.temp.toFixed()} °C</div>
        //                     <div className="today-hour-weather__wind">Ветер: {itm.wind.speed.toFixed()} м/с</div>
        //                 </div>
        //             }
        //         })
        //     }
        // </div>
        <div className="forecast-one-day">
            <div className="day-weather__name-day">
                <div>
                    <span>{new Date(props.date).getDate()}</span>
                    <span>{props.months[new Date(props.date).getMonth()]}</span>
                </div>
                <span>{props.days[new Date(props.date).getDay()]}</span>
            </div>

            <div className="day-weather-hour-list">
                {
                    props.weatherList.map((item, index) => {
                        if (props.date === item.dt_txt.split(' ')[0]) {
                            return <div className="day-weather-hour-line" key={index}>
                                <div>
                                    <span>{item.dt_txt.split(' ')[1].slice(0, -3)}</span>
                                    <span>
                                        <div className="today-hour-weather__temp">
                                            <div className="day-weather__ico">
                                                <img src={'https://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x' + '.png'} alt="" />
                                            </div>
                                            {item.main.temp.toFixed()} °C
                                        </div>
                                        <div className="today-hour-weather__wind">
                                            <img src={wind} alt="wind" />
                                            {item.wind.speed.toFixed()}&nbsp;м/с
                                        </div>
                                    </span>
                                </div>
                            </div>
                        }
                    })
                }
            </div>
        </div>
    )
}

export default DayWeather