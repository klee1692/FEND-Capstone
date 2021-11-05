import { updateUI } from './js/app';
import { getCoord } from './js/geonames';
import { getWeather } from './js/weatherbit';
import { getImage } from './js/pixabay';
import { getCountryInfo } from './js/restcountries';
import { printDiv } from './js/print';

import './styles/style.scss';

document.getElementById('go').addEventListener('click', getCoord);

export {
    updateUI,
    getCoord,
    getWeather,
    getImage,
    getCountryInfo,
    printDiv
}