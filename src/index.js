import './css/styles.css';
import debounce from 'lodash.debounce';
// console.log(debounce);
import Notiflix from 'notiflix';
// console.log(Notiflix);
const DEBOUNCE_DELAY = 300;
import fetchCountries from './fetchCountries';

const refs = {
  inputEl: document.querySelector('#search-box'),
  listEl: document.querySelector('.country-list'),
  divEl: document.querySelector('.country-info'),
};

// console.log(refs.inputEl);
// console.log(refs.listEl);
// console.log(refs.divEl);

refs.inputEl.addEventListener('input', debounce(OnSearch, DEBOUNCE_DELAY));

function OnSearch(e) {
  const nameCountry = e.target.value.trim();
  if (!nameCountry) {
    refs.listEl.innerHTML = '';
    refs.divEl.innerHTML = '';
    return;
  }
  fetchCountries(nameCountry)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        refs.listEl.innerHTML = '';
        refs.divEl.innerHTML = '';
        return;
      }
      renderMarkup(countries);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      refs.listEl.innerHTML = '';
      refs.divEl.innerHTML = '';
    });
}

function createlistMarkup(countries) {
  return countries
    .map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${name.official}" width="30">${name.official}</li>`;
    })
    .join('');
}

function createCountryMarkup(countries) {
  return countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<img src="${flags.svg}" alt="${
        name.official
      }" width="30" height="30"/>
      <h1>${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`;
    })
    .join('');
}

function renderMarkup(countries) {
  if (countries.length > 2 && countries.length < 10) {
    refs.divEl.innerHTML = '';
    return (refs.listEl.innerHTML = createlistMarkup(countries));
  } else {
    refs.listEl.innerHTML = '';
    return (refs.divEl.innerHTML = createCountryMarkup(countries));
  }
}
