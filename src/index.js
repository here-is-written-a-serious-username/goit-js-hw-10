

import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
    timeout: 9000,
    position: 'center-top',
});

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
const ulEl = document.querySelector(".country-list");
const divEl = document.querySelector(".country-info");

inputEl.addEventListener('input', debounce(takeInputValue, DEBOUNCE_DELAY));

// console.dir(inputEl);

function takeInputValue(e) {
    const enteredCountry = e.target.value.trim();
    if (!enteredCountry) {
        return
    }

    fetchCountries(enteredCountry).then(arrOfCountries => {
        console.log(arrOfCountries);

        if (arrOfCountries.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        };

        if (arrOfCountries.length === 1) {
            ulEl.innerHTML='';
            divEl.innerHTML = createSingleMarkup(arrOfCountries);
            return;
        };

        divEl.innerHTML = '';
        ulEl.innerHTML = createlistMarkup(arrOfCountries);

    }).catch(() => Notify.failure('Oops, there is no country with that name.'));;

};

function createSingleMarkup(arrOfCountries) {
    return arrOfCountries.map(singleMarkupMaker);

    function singleMarkupMaker({ name, capital, population, flags, languages, coatOfArms }) {
        return (
            `<h1><img src="${flags.svg}" alt="${name.official}" width="60" height="40">${name.official}</h1>
            <p>Capital: ${capital}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${Object.values(languages)}</p>
            <img src="${coatOfArms.svg}" alt="coatOfArms of ${name.official}" width="80" >`
        );
    };
};

function createlistMarkup (arrOfCountries) {
    return arrOfCountries.map(({ name, flags }) => { return `<li><img src="${flags.svg}" alt="${name.official}" width="60">${name.official}</li>`}).join('');
};
