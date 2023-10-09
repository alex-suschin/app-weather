import React, { useState } from 'react'
import DayWeather from './DayWeather'
import wind from "../assets/img/wind-ico.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';

const OneHour = ({ weatherList, days, months, currDay, currentHour, indexCurrTime, getCurrTemp }) => {
    return (
        <>
            <Swiper className="weather-hours"
                modules={[Mousewheel, FreeMode]}
                spaceBetween={0}
                slidesPerView={2}
                mousewheel={{ sensitivity: 5 }}
                freeMode={true}
                breakpoints={{
                    640: {
                        slidesPerView: 5,
                    }
                }}>
                {
                    weatherList.slice(indexCurrTime).map((itm, idx) => {
                        if (currDay === itm.dt_txt.split(' ')[0]) {
                            return <SwiperSlide className="today-hour-weather" key={idx}>
                                <div className="today-hour-weather__time">
                                    <span>{itm.dt_txt.split(' ')[1].slice(0, -3)}</span>
                                </div>
                                <div className="today-hour-weather__temp">
                                    <div className="day-weather__ico">
                                        <img src={'weather-icons/' + itm.weather[0].icon + '.svg'} alt="" />
                                    </div>
                                    <span>{getCurrTemp(itm.main.temp)}°C</span>
                                </div>
                                <div className="today-hour-weather__wind">
                                    <div className="day-wind__ico">
                                        <img src={wind} alt="wind" />
                                    </div>
                                    <span>{itm.wind.speed.toFixed()}&nbsp;м/с</span>
                                </div>
                            </SwiperSlide>
                        }
                    })
                }
            </Swiper>
        </>
    )
}

export default OneHour