import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";


const Search = (props) => {
	const [search, setSearch] = useState(null);

	const loadOptions = (inputValue) => {
		return fetch(
			`${GEO_API_URL}/cities?languageCode=ru&limit=10&namePrefix=${inputValue}`,
			geoApiOptions
		)
			.then((response) => response.json())
			.then((response) => {
				return {
					options: response.data.map((city) => {
						return {
							value: `${city.latitude} ${city.longitude}`,
							label: `${city.name}, ${city.country}`,
						};
					}),
				};
			});
	};

	const handleOnChange = (searchData) => {
		setSearch(searchData.label.split(',')[0]);
		props.searchLocation(searchData.label.split(',')[0]);
	};

	return (
		<AsyncPaginate
			placeholder="Выберите город"
			debounceTimeout={600}
			value={search}
			onChange={handleOnChange}
			loadOptions={loadOptions}
		/>
	);
};

export default Search;
