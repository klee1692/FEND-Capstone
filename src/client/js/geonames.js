// getCoord returns coord. info for weatherbit and REST countries

async function getCoord(event) {

    event.preventDefault();

    let cityTo = document.getElementById("city-to").value;

    fetch('http://localhost:8081/getCoord', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cityTo }),
    })
        .then(res => res.json())
        .then(function (res) {
            console.log(res);
            return res;
        })
        .then(function (res) {
            Client.getWeather(res);
            Client.getCountryInfo(res);
        })
        .catch((error) => {
            console.log("error", error);
        });

}

export { getCoord }