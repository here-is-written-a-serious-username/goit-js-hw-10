

const BASE_URL = 'https://restcountries.com/v3.1/name';
const FILTER_RESPONSE = 'name,capital,population,flags,languages,coatOfArms';


export function fetchCountries (name) {
    return fetch(`${BASE_URL}/${name}?fields=${FILTER_RESPONSE}`)
        .then(response => {
            if (!response.ok) {
                throw new Error;
            }
            return response.json();
        })
};