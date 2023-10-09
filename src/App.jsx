import { useEffect, useState } from 'react'
import './App.scss';
import DataListInput from "react-datalist-input";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from 'axios';
import sunny from "./assets/img/sunny.jpg";
import cloud from "./assets/img/cloud.jpg";
import rain from "./assets/img/rain.jpg";
import fog from "./assets/img/fog.jpg";
import dirt from "./assets/img/dirt.jpg";
import morning from "./assets/img/morning.jpg";
import day from "./assets/img/day.jpg";
import evening from "./assets/img/evening.jpg";
import night from "./assets/img/night.jpg";
import loadingImg from "./assets/img/loading.svg";
import wind from "./assets/img/wind-ico.svg";
import compas from "./assets/img/compas.png";
import arrWind from "./assets/img/arr-wind.svg";
import sunrise from "./assets/img/sunrise-ico.svg";
import sunset from "./assets/img/sunset-ico.svg";
import DayWeather from './components/DayWeather';
import OneHour from './components/OneHour';
import Search from './components/search/search';

function App() {
	const [data, setData] = useState({})
	const [emptyData, setEmptyData] = useState(true)
	// const [cities, setCities] = useState([])
	const [weatherList, SetWeatherList] = useState([])
	const [location, setLocation] = useState('')
	const [bgImg, setBgImg] = useState(null)
	const [iconWeather, setIconWeather] = useState('')
	const [timeSunrise, setTimeSunrise] = useState(0)
	const [timeSunset, setTimeSunset] = useState(0)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [errorText, setErrorText] = useState(false)
	const [search, setSearch] = useState(null);
	const [timeZone, setTimeZone] = useState(0);
	const [currentHour, setCurrentHour] = useState(0);
	const [currentFullDate, setCurrentFullDate] = useState(0);
	const [currentDate, setCurrentDate] = useState(0);
	const [currentDay, setCurrentDay] = useState(0);
	const [currentMonth, setCurrentMonth] = useState('');
	const [currentMinutes, setCurrentMinutes] = useState(0);
	const [currentDayTime, setCurrentDayTime] = useState(new Date());
	const [indexCurrTime, setIndexCurrTime] = useState(0);
	const [ff, setFf] = useState([]);
	const [toggleBtn, setToggleBtn] = useState(false);
	// const [fifthDaysArr, setFifthDaysArr] = useState([]);
	// const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=ru&units=metric&appid=43ee781287794660856df106e59d463f`;
	// const urlCities = "/ajax/cities.json";
	const buttonText = 'Показать подробней';
	const buttonTextNew = 'Скрыть';


	let fifthDaysArr = [];
	const todayDay = new Date();
	const nowTime = todayDay.getTime();
	let currDayInPlace = new Date(currentDayTime);
	const todayDayCurr = timeZone > 0 ? new Date(currDayInPlace.getTime() + (currDayInPlace.getTimezoneOffset() * 60 * 1000)) : new Date((currDayInPlace.getTime() - (currDayInPlace.getTimezoneOffset() * 60 * 1000)));

	for (let i = 0; i < 5; i += 1) {
		fifthDaysArr.push(todayDayCurr.toLocaleDateString('en-CA'));
		todayDayCurr.setDate(todayDayCurr.getDate() + 1);
	}

	function getIndexCurrHour(list, currDay) {
		let arrHours = [];
		let startHour = 0;
		let startHourIndex = 0;

		list.map((itm, idx) => {
			if (currDay === itm.dt_txt.split(' ')[0]) {
				arrHours.push(+itm.dt_txt.split(' ')[1].split(':')[0]);
			}
		});

		startHour = arrHours.reduce(function (prev, curr) {
			return (Math.abs(curr - currentHour) < Math.abs(prev - currentHour) ? curr : prev);
		})

		startHourIndex = String(startHour).length === 1 ? data.list.map(el => el.dt_txt).indexOf(currentFullDate + ' ' + '0' + startHour + ':00:00') : data.list.map(el => el.dt_txt).indexOf(currentFullDate + ' ' + startHour + ':00:00');
		return startHourIndex;
	}

	function getCurrTemp(temp) {
		let fixTemp = temp.toFixed();
		if (String(fixTemp).includes('-0.') || (String(fixTemp).includes('-0'))) {
			return '0'
		} else if ((!String(fixTemp).includes('-')) && (!String(fixTemp).startsWith('0'))) {
			return '+' + fixTemp
		} else {
			return fixTemp
		}
	}

	const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

	// useEffect(() => {
	// 	const getCities = () => {
	// 		axios.get(urlCities).then((response) => {
	// 			setCities(Object.entries(response.data).map(([key, item]) => ({ id: key, value: item.name, label: item.name })))
	// 		})
	// 	}
	// 	getCities()
	// }, [])


	useEffect(() => {
		if (!emptyData) {
			setIconWeather(data.list[indexCurrTime].weather[0].icon)
			if (data.list[indexCurrTime].weather[0].description === "ясно") {
				setBgImg(sunny);
			}

			if (data.list[indexCurrTime].weather[0].description === "туман") {
				setBgImg(fog);
			}

			if (data.list[indexCurrTime].weather[0].description === "облачно" || data.list[indexCurrTime].weather[0].description === "небольшая облачность" || data.list[indexCurrTime].weather[0].description === "облачно с прояснениями" || data.list[indexCurrTime].weather[0].description === "переменная облачность") {
				setBgImg(cloud);
			}

			if (data.list[indexCurrTime].weather[0].description === "дождь" || data.list[indexCurrTime].weather[0].description === "небольшой дождь") {
				setBgImg(rain);
			}

			if (data.list[indexCurrTime].weather[0].description === "пасмурно") {
				setBgImg(dirt);
			}

			setIndexCurrTime(getIndexCurrHour(weatherList, currentFullDate))
		}
	}, [data])

	const searchLocation = (city) => {
		setLoading(true)
		axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=43ee781287794660856df106e59d463f`).then((response) => {
			setLoading(false)
			setError(false)
			setErrorText(null)
			setData(response.data)
			setEmptyData(false)
			// setTimeSunrise(response.data.city.sunrise)
			// setTimeSunset(response.data.city.sunset)
			setTimeSunrise(response.data.city.timezone ? new Date((response.data.city.sunrise * 1000) + (response.data.city.timezone * 1000)).getUTCHours() + ":" + (String(new Date(response.data.city.sunrise * 1000).getUTCMinutes()).length === 1 ? '0' + new Date(response.data.city.sunrise * 1000).getUTCMinutes() : new Date(response.data.city.sunrise * 1000).getUTCMinutes()) : new Date((response.data.city.sunrise * 1000) - (response.data.city.timezone * 1000)).getUTCHours() + ":" + (String(new Date(response.data.city.sunrise * 1000).getUTCMinutes()).length === 1 ? '0' + new Date(response.data.city.sunrise * 1000).getUTCMinutes() : new Date(response.data.city.sunrise * 1000).getUTCMinutes()))
			setTimeSunset(response.data.city.timezone ? new Date((response.data.city.sunset * 1000) + (response.data.city.timezone * 1000)).getUTCHours() + ":" + (String(new Date(response.data.city.sunset * 1000).getUTCMinutes()).length === 1 ? '0' + new Date(response.data.city.sunset * 1000).getUTCMinutes() : new Date(response.data.city.sunset * 1000).getUTCMinutes()) : new Date((response.data.city.sunset * 1000) - (response.data.city.timezone * 1000)).getUTCHours() + ":" + (String(new Date(response.data.city.sunset * 1000).getUTCMinutes()).length === 1 ? '0' + new Date(response.data.city.sunset * 1000).getUTCMinutes() : new Date(response.data.city.sunset * 1000).getUTCMinutes()))
			setTimeZone(response.data.city.timezone)
			setCurrentHour(response.data.city.timezone ? new Date(nowTime + (response.data.city.timezone * 1000)).getUTCHours() : new Date(nowTime - ((response.data.city.timezone * 1000))).getUTCHours())
			setCurrentFullDate(
				response.data.city.timezone ? new Date(nowTime + (response.data.city.timezone * 1000)).getUTCFullYear() + '-' + (String(new Date(nowTime + (response.data.city.timezone * 1000)).getUTCMonth() + 1).length === 1 ? '0' + new Date(nowTime + (response.data.city.timezone * 1000)).getUTCMonth() + 1 : new Date(nowTime + (response.data.city.timezone * 1000)).getUTCMonth() + 1) + '-' + (String(new Date(nowTime + (response.data.city.timezone * 1000)).getUTCDate()).length === 1 ? '0' + new Date(nowTime + (response.data.city.timezone * 1000)).getUTCDate() : new Date(nowTime + (response.data.city.timezone * 1000)).getUTCDate())
					:
					new Date(nowTime - (response.data.city.timezone * 1000)).getUTCFullYear() + '-' + (String(new Date(nowTime - (response.data.city.timezone * 1000)).getUTCMonth() + 1).length === 1 ? '0' + new Date(nowTime - (response.data.city.timezone * 1000)).getUTCMonth() + 1 : new Date(nowTime - (response.data.city.timezone * 1000)).getUTCMonth() + 1) + '-' + (String(new Date(nowTime - (response.data.city.timezone * 1000)).getUTCDate()).length === 1 ? '0' + new Date(nowTime - (response.data.city.timezone * 1000)).getUTCDate() : new Date(nowTime - (response.data.city.timezone * 1000)).getUTCDate()))
			setCurrentDate(response.data.city.timezone ? new Date(nowTime + (response.data.city.timezone * 1000)).getUTCDate() : new Date(nowTime - ((response.data.city.timezone * 1000))).getUTCDate())
			setCurrentDay(response.data.city.timezone ? days[new Date(nowTime + (response.data.city.timezone * 1000)).getUTCDay()] : days[new Date(nowTime - ((response.data.city.timezone * 1000))).getUTCDay()])
			setCurrentMonth(response.data.city.timezone ? months[new Date(nowTime + (response.data.city.timezone * 1000)).getUTCMonth()] : months[new Date(nowTime - ((response.data.city.timezone * 1000))).getUTCMonth()])
			setCurrentMinutes(response.data.city.timezone ? new Date(nowTime).getUTCMinutes() : new Date((nowTime - (response.data.city.timezone))).getUTCMinutes())
			SetWeatherList(response.data.list)
			setCurrentDayTime(response.data.city.timezone > 0 ? new Date(todayDay.getTime() + (response.data.city.timezone * 1000)).toUTCString() : new Date(todayDay.getTime() - (Math.abs(response.data.city.timezone) * 1000)).toUTCString())
		})
			.catch(function (error) {
				if (error.response) {
					setLoading(false)
					setError(true)
					setErrorText(error.response.data.message)
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					setLoading(false)
					setError(true)
					setErrorText(error.response.data.message)
					console.log(error.request);
				} else {
					setLoading(false)
					setError(true)
					setErrorText(error.response.data.message)
					console.log('Error', error.message);
				}
				setLoading(false)
				// setError(true)
				console.log(error.config);
			});
		// setLocation('');
	}

	const toggleParametres = () => {
		setToggleBtn(!toggleBtn);
	}

	return (
		<>
			<div className="wrap">
				{loading && <div className="loading">
					<img src={loadingImg} alt="" />
				</div>}
				<div className="bg-weather">
					{!emptyData &&
						currentHour >= 12 && currentHour < 18 && <div className="day-bg">
							<img src={day} alt="day" />
						</div>
					}
					{!emptyData &&
						currentHour >= 18 && currentHour <= 23 && <div className="evening-bg">
							<img src={evening} alt="evening" />
						</div>
					}
					{!emptyData &&
						(currentHour >= 0 && currentHour < 6) && <div className="night-bg">
							<img src={night} alt="night" />
						</div>
					}
					{!emptyData &&
						currentHour >= 6 && currentHour < 12 && <div className="morning-bg">
							<img src={morning} alt="morning" />
						</div>
					}
				</div>

				<div className="weather-top-line">
					<h1>Узнайте погоду в своём городе</h1>
					<div className="search">
						{/* <DataListInput className='react-select-container datalist-input datalist-input-contract'
							placeholder="Выберите город"
							items={cities}
							onSelect={(event) => {
								setLocation(event.value);
								searchLocation(event.value);
							}}
						/> */}

						<Search searchLocation={searchLocation} />

						{/* <input
							value={location}
							onChange={event => setLocation(event.target.value)}
							onKeyUp={searchLocation}
							placeholder='Введите город'
							type="text" /> */}
					</div>
					{error && <p className="error">Ошибка: {errorText}, попробуйте повторить позже</p>}
				</div>

				<div className="weather-wrap">
					<div className="weather-wrap-name-day">
						{!emptyData &&
							<>
								<div>
									<span>{currentDate}</span>
									<span>{currentMonth}</span>
								</div>
								<div className="time-clock"><b>Сейчас:</b> {currentHour}<i className="time-dots">:</i>{String(currentMinutes).length === 1 ? '0' + currentMinutes : currentMinutes}</div>
								<div>
									<span>{currentDay}</span>
								</div>
							</>
						}
					</div>
					<div className="weather-wrap-left">
						<div className="weather-wrap__city">
							{!emptyData ? <h2>{data.city.name}</h2> : "Выберите город"}
						</div>
						<div className="weather-wrap__weather">
							{!emptyData ? <h2>{data.list[indexCurrTime].weather[0].description}</h2> : "-"}
						</div>
						<div className="weather-wrap__temp">
							{!emptyData ? <h2>{getCurrTemp(data.list[indexCurrTime].main.temp)}°C</h2> : "0°C"}
							{!emptyData ? <div className="weather-wrap__ico"><img src={`weather-icons/${iconWeather}` + '.svg'} alt="" /></div> : null}
						</div>
						<div className="weather-wrap__coord">
							{!emptyData ?
								<a className="go-maps-link" href={`https://www.google.com/maps/@${data.city.coord.lat},${data.city.coord.lon},12z`} target="_blank">Открыть на карте</a> : "-"}
						</div>
					</div>

					<div className="button button-toggle-parametres" onClick={toggleParametres}>{!toggleBtn ? buttonText : buttonTextNew}</div>

					<div className={`weather-wrap-right ${toggleBtn ? '_active' : null}`}>
						<div className="weather-parametres">
							<div className="weather-wrap__feels-like">
								<span>Ощущается</span>
								{!emptyData ? <h2>{getCurrTemp(data.list[indexCurrTime].main.feels_like)}°C</h2> : "-"}
							</div>

							<div className="weather-wrap__wind">
								<span>Ветер <img className="small-ico" src={wind} alt="" /></span>
								{!emptyData ? <div className="wind-adds">
									<h2>{data.list[indexCurrTime].wind.speed.toFixed()}&nbsp;м/c</h2>
									<div className="wind-arrow">
										<img className="compas-wind" src={compas} alt="" />
										<img className="arr-wind" style={{ transform: `rotate(${data.list[indexCurrTime].wind.deg}deg)` }} src={arrWind} alt="" />
									</div>
								</div>
									: "-"}
							</div>
							<div className="weather-wrap__clouds">
								<span>Облачность</span>
								{!emptyData ? <h2>{data.list[indexCurrTime].clouds.all} %</h2> : "-"}
							</div>
							<div className="weather-wrap__pressure">
								<span>Атм. Давление</span>
								{!emptyData ? <h2>{data.list[indexCurrTime].main.pressure} гПа</h2> : "-"}
							</div>
						</div>

						<div className="weather-parametres">
							<div className="weather-wrap__sunrise">
								<span>Восход <img className="small-ico" src={sunrise} alt="" /></span>
								{!emptyData ? <h2>{timeSunrise}</h2> : "-"}
							</div>
							<div className="weather-wrap__sunset">
								<span>Закат <img className="small-ico" src={sunset} alt="" /></span>
								{!emptyData ? <h2>{timeSunset}</h2> : "-"}
							</div>
							<div className="weather-wrap__feels-like">
								<span>Видимость</span>
								{!emptyData ? <h2>{(data.list[indexCurrTime].visibility / 1000).toFixed()} км.</h2> : "-"}
							</div>
							<div className="weather-wrap__wind">
								<span>Влажность</span>
								{!emptyData ? <h2>{data.list[indexCurrTime].main.humidity} %</h2> : "-"}
							</div>
						</div>
					</div>

					<div className="weather-hours-wrap">
						{!emptyData ? <OneHour getCurrTemp={getCurrTemp} indexCurrTime={indexCurrTime} currentHour={currentHour} weatherList={data.list} days={days} months={months} currDay={currentFullDate} key={currentDate} /> : "-"
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
										return <DayWeather getCurrTemp={getCurrTemp} date={el} days={days} months={months} key={i} index={i} weatherList={weatherList} />
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
