import React, { useState } from 'react'
import wind from "../assets/img/wind-ico.svg";
import humidity from "../assets/img/humidity.svg";


const DayWeather = (props) => {
    const [isShowWeather, setIsShowWeather] = useState(false);

    const toggleWeather = (e) => {
        e.target.classList.toggle('_active');

        let daysElems = document.querySelectorAll('.day-weather__name-day');
        daysElems.forEach(function (item) {
            if (item.classList.contains('_active')) {
                item.classList.add('_active');
            } else {
                item.classList.remove('_active');
            }
        });
    }

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
            <div className="day-weather__name-day" onClick={(e) => toggleWeather(e)}>
                <div>
                    <div>
                        <span>{new Date(props.date).getDate()}</span>
                        <span>{props.months[new Date(props.date).getMonth()]}</span>
                    </div>
                    <span>{props.days[new Date(props.date).getDay()]}</span>
                </div>
                <div>
                    {
                        props.weatherList.map((item, index) => {
                            if (props.date === item.dt_txt.split(' ')[0] && item.dt_txt.split(' ')[1] === '03:00:00') {
                                return <div className="day-weather-prewiew" key={index}>
                                    <span>Ночь:</span>
                                    <div>
                                        <span className="prewiew-info">
                                            <img src={'weather-icons/' + item.weather[0].icon + '.svg'} alt="" />
                                            <span>{item.main.temp && '+'}{item.main.temp.toFixed()} °C,</span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="prewiew-info">
                                            <img src={humidity} alt="" />
                                            <span>{item.main.humidity}%</span>
                                        </span>
                                    </div>
                                </div>
                            }
                        })
                    }

                    {
                        props.weatherList.map((item, index) => {
                            if (props.date === item.dt_txt.split(' ')[0] && item.dt_txt.split(' ')[1] === '15:00:00') {
                                return <div className="day-weather-prewiew" key={index}>
                                    <span>День:</span>
                                    <div>
                                        <span className="prewiew-info">
                                            <img src={'weather-icons/' + item.weather[0].icon + '.svg'} alt="" />
                                            <span>{item.main.temp && '+'}{item.main.temp.toFixed()} °C,</span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="prewiew-info">
                                            <img src={humidity} alt="" />
                                            <span>{item.main.humidity}%</span>
                                        </span>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
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
                                                <img src={'weather-icons/' + item.weather[0].icon + '.svg'} alt="" />
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