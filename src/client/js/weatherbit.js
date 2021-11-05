// getWeather fetches from Weatherbit using response from Geonames

async function getWeather(res) {

    const latitude = res.lat;
    const longitude = res.lng;

    fetch('http://localhost:8081/getWeather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
    })
        .then(res => res.json())
        .then(function (res) {
            console.log(res);
            return res;
        })
        .then(function (res) {
            Client.updateUI(res);
        })
        .catch((error) => {
            console.log("error", error);
        });
}

export {
    getWeather
}