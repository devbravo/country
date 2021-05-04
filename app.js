let URL = 'https://restcountries.eu/rest/v2/';
const countryListdiv = document.getElementById('countryList');
const countryListDropdown = document.getElementById('countries-list');

fetch(URL)
    .then(res => res.json())
    .then(json => {
        const data = json;
        countryListDropdown.length = 0;

        let defaultOption = document.createElement('option');
        defaultOption.text = 'Choose country';
        countryListDropdown.add(defaultOption);
        countryListDropdown.selectedIndex = 0;

        let option;
        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.text = data[i].name;
            option.value = JSON.stringify(data[i]);
            countryListDropdown.add(option);
        }
    })
    .catch(function (error) {
        console.log('retrieving country list has failed: ' + error);
    });

function populate(country) {
    const countryList = document.getElementById('countries-list');
    document.getElementById('countries-list').innerHTML = countryList;
}

function addCountryDetails(country, counter) {
    //add country name
    let countryHeader = document.createElement('h2');
    let countryName = document.createTextNode(country.name);
    countryHeader.appendChild(countryName);
    countryHeader.id = 'cn' + counter;
    countryHeader.className = 'displayInline';
    countryListdiv.appendChild(countryHeader);

    //add countryflag
    let countryFlag = document.createElement('img');
    countryFlag.id = 'cf' + counter;
    countryFlag.src = country.flag;
    countryFlag.width = '50';
    countryFlag.className = 'displayInline';
    countryListdiv.appendChild(countryFlag);

    let seperator = document.createElement('div');
    seperator.className = 'seperator';
    countryListdiv.appendChild(seperator);
}

function showCountryDetails() {
    let country = JSON.parse(countryListDropdown.value);
    console.log(country);
}