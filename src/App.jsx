import { useEffect, useState } from 'react'
import './App.scss';
import DataListInput from "react-datalist-input";
import axios from 'axios';
import sunny from "./assets/img/sunny.jpg";
import cloud from "./assets/img/cloud.jpg";
import rain from "./assets/img/rain.jpg";
import fog from "./assets/img/fog.jpg";
import dirt from "./assets/img/dirt.jpg";
import loadingImg from "./assets/img/loading.svg";
import wind from "./assets/img/wind-ico.svg";
import sunrise from "./assets/img/sunrise-ico.svg";
import sunset from "./assets/img/sunset-ico.svg";
import DayWeather from './components/DayWeather';
import OneHour from './components/OneHour';

function App() {
	const [data, setData] = useState({})
	const [emptyData, setEmptyData] = useState(true)
	const [cities, setCities] = useState([])
	const [weatherList, SetWeatherList] = useState([])
	const [location, setLocation] = useState('')
	const [bgImg, setBgImg] = useState(null)
	const [iconWeather, setIconWeather] = useState('')
	const [timeSunrise, setTimeSunrise] = useState(0)
	const [timeSunset, setTimeSunset] = useState(0)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=ru&units=metric&appid=43ee781287794660856df106e59d463f`;
	const urlCities = "/ajax/cities.json";
	let fifthDaysArr = [];
	const todayDay = new Date();

	for (let i = 0; i < 5; i += 1) {
		fifthDaysArr.push(todayDay.toLocaleDateString('en-CA'));
		todayDay.setDate(todayDay.getDate() + 1);
	}

	const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октяря', 'Ноября', 'Декабря'];

	useEffect(() => {
		const getCities = () => {
			axios.get(urlCities).then((response) => {
				setCities(Object.entries(response.data).map(([key, item]) => ({ id: key, value: item.name, label: item.name })))
			})
		}
		getCities()
	}, [])


	useEffect(() => {
		if (!emptyData) {
			setIconWeather(data.list[0].weather[0].icon)
			if (data.list[0].weather[0].description === "ясно") {
				setBgImg(sunny);
			}

			if (data.list[0].weather[0].description === "туман") {
				setBgImg(fog);
			}

			if (data.list[0].weather[0].description === "облачно" || data.list[0].weather[0].description === "небольшая облачность" || data.list[0].weather[0].description === "облачно с прояснениями" || data.list[0].weather[0].description === "переменная облачность") {
				setBgImg(cloud);
			}

			if (data.list[0].weather[0].description === "дождь" || data.list[0].weather[0].description === "небольшой дождь") {
				setBgImg(rain);
			}

			if (data.list[0].weather[0].description === "пасмурно") {
				setBgImg(dirt);
			}
		}
	}, [data])

	const searchLocation = (city) => {
		setLoading(true)
		axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=43ee781287794660856df106e59d463f`).then((response) => {
			setLoading(false)
			setError(false)
			setData(response.data)
			setEmptyData(false)
			setTimeSunrise(response.data.city.sunrise)
			setTimeSunset(response.data.city.sunset)
			SetWeatherList(response.data.list)
		})
			.catch(function (error) {
				if (error.response) {
					setLoading(false)
					setError(true)
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					setLoading(false)
					setError(true)
					console.log(error.request);
				} else {
					setLoading(false)
					setError(true)
					console.log('Error', error.message);
				}
				setLoading(false)
				// setError(true)
				console.log(error.config);
			});
		// setLocation('');
	}

	return (
		<>
			<div className="wrap">

				{loading && <div className="loading">
					<img src={loadingImg} alt="" />
				</div>}
				<div className="bg-weather">
					{bgImg !== "" && bgImg !== null ? <img src={bgImg} alt="bgWeather" /> : null}
				</div>
				<h1>Узнайте погоду в своём городе</h1>
				{error && <p className="error">Ошибка: попробуйте повторить позже</p>}
				<div className="search">
					<DataListInput className='react-select-container datalist-input datalist-input-contract'
						placeholder="Выберите город"
						items={cities}
						onSelect={(event) => {
							setLocation(event.value);
							searchLocation(event.value);
						}}
					/>
					{/* <input
						value={location}
						onChange={event => setLocation(event.target.value)}
						onKeyUp={searchLocation}
						placeholder='Введите город'
						type="text" /> */}
				</div>
				<div className="weather-wrap">
					<div className="weather-wrap-name-day">
						{!emptyData &&
							<>
								<div>
									<span>{new Date(data.list[0].dt_txt.split(' ')[0]).getDate()}</span>
									<span>{months[new Date(data.list[0].dt_txt.split(' ')[0]).getMonth()]}</span>
								</div>
								<div>
									<span>{days[new Date(data.list[0].dt_txt.split(' ')[0]).getDay()]}</span>
								</div>
							</>
						}
					</div>
					<div className="weather-wrap-left">
						<div className="weather-wrap__city">
							{!emptyData ? <h2>{data.city.name}</h2> : "Выберите город"}
							{!emptyData ? <div className="weather-wrap__ico"><img src={'https://openweathermap.org/img/wn/' + iconWeather + '@2x' + '.png'} alt="" /></div> : null}
						</div>
						<div className="weather-wrap__temp">
							{!emptyData ? <h2>{data.list[0].main.temp.toFixed()}°C</h2> : "0°C"}
						</div>
						<div className="weather-wrap__weather">
							{!emptyData ? <h2>{data.list[0].weather[0].description}</h2> : "-"}
						</div>
						<div className="weather-wrap__coord">
							{!emptyData ?
								<a className="go-maps-link" href={`https://www.google.com/maps/@${data.city.coord.lat},${data.city.coord.lon},12z`} target="_blank">Открыть на карте</a> : "-"}
						</div>
					</div>

					<div className="weather-wrap-right">
						<div className="weather-parametres">
							<div className="weather-wrap__feels-like">
								<span>Видимость</span>
								{!emptyData ? <h2>{(data.list[0].visibility / 1000).toFixed()} км.</h2> : "-"}
							</div>
							<div className="weather-wrap__wind">
								<span>Влажность</span>
								{!emptyData ? <h2>{data.list[0].main.humidity} %</h2> : "-"}
							</div>
							<div className="weather-wrap__sunrise">
								<span>Облачность</span>
								{!emptyData ? <h2>{data.list[0].clouds.all} %</h2> : "-"}
							</div>
							<div className="weather-wrap__sunset">
								<span>Атм. Давление</span>
								{!emptyData ? <h2>{data.list[0].main.pressure} гПа</h2> : "-"}
							</div>
						</div>

						<div className="weather-parametres">
							<div className="weather-wrap__feels-like">
								<span>Ощущается</span>
								{!emptyData ? <h2>{data.list[0].main.feels_like.toFixed()}°C</h2> : "-"}
							</div>
							<div className="weather-wrap__wind">
								<span>Ветер <img className="small-ico" src={wind} alt="" /></span>
								{!emptyData ? <h2>{data.list[0].wind.speed.toFixed()}&nbsp;м/c</h2> : "-"}
							</div>
							<div className="weather-wrap__sunrise">
								<span>Восход <img className="small-ico" src={sunrise} alt="" /></span>
								{!emptyData ? <h2>{new Date(timeSunrise * 1000).getHours() + ":" + new Date(timeSunrise * 1000).getMinutes()}</h2> : "-"}
							</div>
							<div className="weather-wrap__sunset">
								<span>Закат <img className="small-ico" src={sunset} alt="" /></span>
								{!emptyData ? <h2>{new Date(timeSunset * 1000).getHours() + ":" + new Date(timeSunset * 1000).getMinutes()}</h2> : "-"}
							</div>
						</div>
					</div>

					<div className="weather-hours">
						{!emptyData ? <OneHour fifthDaysArr={fifthDaysArr} weatherList={weatherList} days={days} months={months} currDay={fifthDaysArr[0]} key={fifthDaysArr[0]} /> : "-"
						}
					</div>


					<div className="forecast-weather-wrap">
						{!emptyData ? <h2>Прогноз на 4 дня</h2> : '-'}
						<div className="forecast-weather">
							{!emptyData &&
								// weatherList.map((itm, idx) => {
								// 	return <DayWeather item={itm} date={itm.dt_txt.split(' ')[0]} days={days} months={months} key={idx} />
								// })

								// weatherList.map((itm, idx) => {
								// 	if (idx % 8 == 0) {
								// 		return <DayWeather item={itm} date={itm.dt_txt.split(' ')[0]} days={days} months={months} key={idx} currDay={itm} weatherList={weatherList} />
								// 	} else {
								// 		return false
								// 	}
								// })

								fifthDaysArr.map((el, i) => {
									if (i != 0) {
										return <DayWeather date={el} days={days} months={months} key={i} weatherList={weatherList} />
									}
								})

								// fifthDaysArr.map((el, i) => {
								// 	return <OneHour fifthDaysArr={fifthDaysArr} weatherList={weatherList} days={days} months={months} currDay={el} key={el} />
								// })


							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default App
