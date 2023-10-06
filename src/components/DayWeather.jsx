import React, { useState } from 'react'
import wind from "../assets/img/wind-ico.svg";
import humidity from "../assets/img/humidity.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';


const DayWeather = (props) => {
    const [toggledisplayDay, setToggledisplayDay] = useState(false);

    const toggleWeatherDay = () => {
        if (window.screen.availWidth < 901) {
            setToggledisplayDay(!toggledisplayDay);
        } else {
            return false;
        }
    }

    return (
        <div className="forecast-one-day">
            <div data-index={props.index} className={`day-weather__name-day ${toggledisplayDay ? '_active' : null}`} onClick={toggleWeatherDay}>
                <div>
                    <div>
                        <span>{new Date(props.date).getUTCDate()}</span>
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
                                            <span>{props.getCurrTemp(item.main.temp)}°C</span>
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
                                            <span>{props.getCurrTemp(item.main.temp)}°C</span>
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

            <Swiper
                modules={[Mousewheel, FreeMode]}
                spaceBetween={0}
                slidesPerView={2}
                mousewheel={{ sensitivity: 5 }}
                freeMode={true}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                    }
                }}
                className="day-weather-hour-list">
                {
                    props.weatherList.map((item, index) => {
                        if (props.date === item.dt_txt.split(' ')[0]) {
                            return <SwiperSlide className="day-weather-hour-line" key={item.dt_txt.split(' ')[1]}>
                                <div>
                                    <span>{item.dt_txt.split(' ')[1].slice(0, -3)}</span>
                                    <span>
                                        <div className="today-hour-weather__temp">
                                            <div className="day-weather__ico">
                                                <img src={'weather-icons/' + item.weather[0].icon + '.svg'} alt="" />
                                            </div>
                                            {props.getCurrTemp(item.main.temp)}°C
                                        </div>
                                        <div className="today-hour-weather__wind">
                                            <img src={wind} alt="wind" />
                                            {item.wind.speed.toFixed()}&nbsp;м/с
                                        </div>
                                    </span>
                                </div>
                            </SwiperSlide>
                        }
                    })
                }
            </Swiper>
        </div>
    )
}

export default DayWeather