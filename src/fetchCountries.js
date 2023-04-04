import Notiflix from 'notiflix';
export default function fetchCountries(nameCountry) {
  const filteredFieldes = '?fields=name,capital,population,flags,languages';
  return fetch(
    `https://restcountries.com/v3.1/name/${nameCountry}${filteredFieldes}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
