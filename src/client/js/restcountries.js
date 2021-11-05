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
                flag: res.flags.png,
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
    document.getElementById("showCountryInfo").onclick = function showInfo() {
        if (infoDisplay.style.display === "none") {
            infoDisplay.style.display = "block";
        } else {
            infoDisplay.style.display = "block";
        };
    }

    // Set text description
    infoDisplay.innerHTML = `${res.officialName}, referred to as ${res.nativeName} in their native language, is an country located in ${res.region}. The country's captial is ${res.capital} and its citizens speak ${res.language}. Make sure to exchange currencies to ${res.currencies} when you arrive!`;

};

export { getCountryInfo }