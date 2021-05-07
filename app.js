//const countryList_div = document.getElementById('countryList');
const countryListDropdown = document.getElementById('countries-list');
const countryFlag = document.getElementById('country-flag');
const countryCapital = document.getElementById('capital');
const countryTimezone = document.getElementById('timezone');
const countryLanguage = document.getElementById('language');
const countryCurrency = document.getElementById('currency');
const countryBorders = document.getElementById('borders');
const countryBlocs = document.getElementById('regionalBlocs');

countryListDropdown.length = 0;

const defaultOption = document.createElement('option');
defaultOption.text = 'Choose Country';

countryListDropdown.add(defaultOption);

const url = 'https://restcountries.eu/rest/v2/';

fetch(url)
  .then(response => {
    if (response.status !== 200) {
      console.warn(
        'Looks like there was a problem. Status code: ',
        response.status
      );
      return;
    }

    let option;
    response.json().then(function (data) {
      data.forEach(data => {
        option = document.createElement('option');
        option.text = data.name;
        option.value = JSON.stringify(data);
        countryListDropdown.add(option);
      });
    });
  })
  .catch(function (error) {
    console.error('Fetch Error - ', error);
  });

let list;
let blocs;
const showCountryDetails = () => {
  const country = JSON.parse(countryListDropdown.value);
  countryFlag.src = country.flag;

  // country capital info
  countryCapital.innerText = `Capital: ${country.capital}`;
  countryTimezone.innerText = `Timezone: ${country.timezones[0]}`;
  countryLanguage.innerText = `Language: ${country.languages[0].name}`;
  countryCurrency.innerText = `Currency: ${country.currencies[0].name}`;

  // country borders
  countryBorders.innerHTML = ' '; // clear previous elements after state change
  country.borders.forEach(data => {
    list = document.createElement('li');
    list.innerText = data;
    countryBorders.appendChild(list);
  });

  // Regional Blocs
  regionalBlocs.innerHTML = ' '; // reset
  country.regionalBlocs.forEach(data => {
    let row = regionalBlocs.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerText = data.acronym;
    cell2.innerText = data.name;
  });

  initMap(parseFloat(country.latlng[0]), parseFloat(country.latlng[1]));
};

let map;

function initMap(lat = 0, lng = 0) {
  console.log(lat, lng);
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng },
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.HYBRID,
  });
}
