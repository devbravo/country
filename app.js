const countryListDropdown = document.getElementById('countries-list');
countryListDropdown.length = 0;
const defaultOption = document.createElement('option');
defaultOption.text = 'Choose Country';
countryListDropdown.add(defaultOption);
const countryFlag = document.getElementById('country-flag');
const countryCapital = document.getElementById('capital');
const countryTimezone = document.getElementById('timezone');
const countryLanguage = document.getElementById('language');
const countryCurrency = document.getElementById('currency');
const countryBorders = document.getElementById('borders');
const url = 'https://restcountries.eu/rest/v2/';
let map;
let list;

//Constants
const responseNOT200 = 'Looks like there was a problem. Status code: ';

function populateCountrydropdown(data) {
    let option = document.createElement('option');
    option.text = data.name;
    option.value = JSON.stringify(data);
    countryListDropdown.add(option);
}

fetch(url)
    .then(response => {
        if (response.status !== 200) {
            console.warn(
                responseNOT200,
                response.status
            );
            return;
        }
        response.json().then(function (data) {
            data.forEach(data => {
                populateCountrydropdown(data);
            });
        });
    })
    .catch(function (error) {
        console.error('Error: ', error);
    });

const showCountryDetails = () => {
    const country = JSON.parse(countryListDropdown.value);
    countryFlag.src = country.flag;

    // country capital info
    countryCapital.innerText = `Capital: ${country.capital}`;
    countryTimezone.innerText = `Timezone: ${country.timezones[0]}`;
    countryLanguage.innerText = `Language: ${country.languages[0].name}`;
    countryCurrency.innerText = `Currency: ${country.currencies[0].name}`;

    // country borders
    countryBorders.innerHTML = ''; // clear previous elements after state change
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

function initMap(lat = 0, lng = 0) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.HYBRID,
    });
}
