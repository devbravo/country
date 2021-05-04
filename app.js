let URL = 'https://restcountries.eu/rest/v2/';
const countryListdiv = document.getElementById('countryList');

fetch(URL)
  .then(res => res.json())
  .then(json => {
    countryList = json;
    let counter = 1;
    countryList.forEach(country => {
      console.log(country.name + '    ' + country.flag);
      addCountryDetails(country, counter);
      populate(country);
      counter++;
    });
  })
  .catch(function (error) {
    console.log('error message: ' + error);
  });

function populate(country) {
  const countryList = document.getElementById('countries-list');
  document.getElementById('countries-list').innerHTML = countryList;
}

/*        let countryList;
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET", URL, false); //de call word synchrone uitgevoerd. pas wanneer de call is afgehandeld word de volgende regel uitgevoerd
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // Response
                     countryList = JSON.parse(this.responseText);
                    //console.log(JSON.parse(data));

                }
            };
            xhttp.send();
        countryList.forEach(country => console.log(country.name));*/

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
