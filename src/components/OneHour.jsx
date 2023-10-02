import React, { useState } from 'react'
import DayWeather from './DayWeather'
import wind from "../assets/img/wind-ico.svg";

const OneHour = ({ weatherList, days, months, currDay, currentHour }) => {
    let arrHours = [];

    weatherList.map((itm, idx) => {
        if (currDay === itm.dt_txt.split(' ')[0]) {
            arrHours.push(+itm.dt_txt.split(' ')[1].split(':')[0])
        }
    })

    let startHour = arrHours.reduce(function (prev, curr) {
        return (Math.abs(curr - currentHour) < Math.abs(prev - currentHour) ? curr : prev);
    });
    let startHourIndex = arrHours.indexOf(startHour);

    weatherList.map((itm, idx) => {
        if (currDay === itm.dt_txt.split(' ')[0]) {

        }
    })

    return (
        <>
            {
                weatherList.slice(startHourIndex).map((itm, idx) => {
                    if (currDay === itm.dt_txt.split(' ')[0]) {
                        return <div className="today-hour-weather" key={idx}>
                            <div className="today-hour-weather__time">
                                <span>{itm.dt_txt.split(' ')[1].slice(0, -3)}</span>
                            </div>
                            <div className="today-hour-weather__temp">
                                <div className="day-weather__ico">
                                    <img src={'weather-icons/' + itm.weather[0].icon + '.svg'} alt="" />
                                </div>
                                <span>{itm.main.temp && '+'}{itm.main.temp.toFixed()} °C</span>
                            </div>
                            <div className="today-hour-weather__wind">
                                <div className="day-wind__ico">
                                    <img src={wind} alt="wind" />
                                </div>
                                <span>{itm.wind.speed.toFixed()}&nbsp;м/с</span>
                            </div>
                        </div>
                    }
                })
            }
        </>
    )
}

export default OneHour