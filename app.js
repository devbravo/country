const countryList_div = document.getElementById('countryList');
const countryListDropdown = document.getElementById('countries-list');
const countryFlag = document.getElementById('country-flag');

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

const showCountryDetails = () => {
  const country = JSON.parse(countryListDropdown.value);
  countryFlag.src = country.flag;
};

//let countryFlag = document.createElement('img');
//countryFlag.width = '50';
//countryFlag.src = country.flag;
//document.getElementById('countryList__flag').appendChild(countryFlag);
//console.log(country.flag);

// function addCountryDetails(country) {
//   //add countryflag
//   let countryFlag = document.createElement('img');
//   countryFlag.src = country.flag;
//   countryFlag.width = '50';
//   countryFlag.className = 'displayInline';
//   countryListdiv.appendChild(countryFlag);

//   let seperator = document.createElement('div');
//   seperator.className = 'seperator';
//   countryListdiv.appendChild(seperator);
// }
