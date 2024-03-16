import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoOptionApi, urlApi } from './apiFolder'

const Search = (props) => {

    const [searchData, setSearchData] = useState(null)

  

    const loadOptionFunc = (inputData) => {
        return fetch(`${urlApi}/cities?minPoupulation=1000000&namePrefix=${inputData}`, geoOptionApi)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(response => {
                if (!response.data) {
                    throw new Error('Response data is missing.');
                }
                return {
                    options: response.data.map((city) => ({
                        value: `${city.latitude} ${city.longitude}`, 
                        label: `${city.name},${city.countryCode}`
                    }))
                };
            })
            .catch(err => {
                console.error('Error loading options:', err);
                return { options: [] }; 
            });
    };
    
    const handlOnChange = (searchData) => {
        setSearchData(searchData)
        props.onSearchChangeData(searchData)
    }
    
    return (
        <AsyncPaginate
            placeholder='Enter city name'
            debounceTimeout={600}
            value={searchData}
            onChange={handlOnChange}
            loadOptions={loadOptionFunc}
        />
    )
}

export default Search
