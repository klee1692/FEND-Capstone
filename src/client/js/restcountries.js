// getCountryInfo fetches country info from REST Countries using response from Geonames

async function getCountryInfo(res) {

    let countryName = res.country;

    fetch('http://localhost:8081/restCountries', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ countryName }),
    })
        .then(res => res.json())
        .then(function (res) {
            let countryInfo = {
                officialName: res.name,
                nativeName: res.nativeName,
                capital: res.capital,
                region: res.region,
                currencies: res.currencies[0].name,
                language: res.languages[0].name,
                nativeLanguage: res.languages[0].nativeName,
                flag: res.flags.png,
                pop: res.population,
                demonym: res.demonym
            };
            res = countryInfo;
            console.log(res);
            return res;
        })
        .then(function (res) {
            addCountryInfo(res);
        })
        .catch((error) => {
            console.log("error", error);
        });

};

// Add country info to page
function addCountryInfo(res) {

    const infoDisplay = document.getElementById('countryInfo')

    // Hides country info by default
    // document.getElementById("showCountryInfo").onclick = function showInfo() {
    //     if (infoDisplay.style.display === "none") {
    //         infoDisplay.style.display = "block";
    //     } else {
    //         infoDisplay.style.display = "block";
    //     };
    // }

    // Set text description
    infoDisplay.innerHTML = `${res.officialName}, referred to as ${res.nativeName} in their native language, is a country located in ${res.region} with a population of ${res.pop.toLocaleString()}. The country's capital is ${res.capital} and the ${res.demonym} people speak ${res.language} (${res.nativeLanguage}). Make sure to exchange currencies to ${res.currencies} when you arrive!`;

};

export { getCountryInfo }