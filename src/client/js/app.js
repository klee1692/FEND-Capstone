function updateUI(res) {

    const cityTo = res.city;
    const departDate = document.getElementById("date-start").value;
    const returnDate = document.getElementById("date-end").value;

    // Set interaction with browser
    // if (cityTo == "" || departDate == "" || returnDate == "") {
    //     alert("Please fill your travel info")
    // } else {
    //     let targetDiv = document.getElementById("travel-card");
    //     if (targetDiv.style.display === "none") {
    //         targetDiv.style.display = "grid";
    //     } else {
    //         targetDiv.style.display = "grid";
    //     };
    // };


    let targetDiv = document.getElementById("travel-card");
    if (targetDiv.style.display === "none") {
        targetDiv.style.display = "grid";
    } else {
        targetDiv.style.display = "grid";
    };

    document.getElementById("generate").addEventListener("click", setCountdown());
    document.getElementById("generate").addEventListener("click", targetDiv.scrollIntoView({ block: "center" }));
    document.getElementById('trip-name').textContent = `Leaving for ${cityTo} on ${departDate} to ${returnDate}`
    document.getElementById('city-caption').innerHTML = `${cityTo}, ${res.country}`;

    // Filling in weather info
    document.getElementById("weather-icon").setAttribute("src", ` https://www.weatherbit.io/static/img/icons/${res.icon}.png`);
    document.getElementById("temp").innerHTML = Math.round(res.temperature) + "&deg;C";
    document.getElementById("weather").innerHTML = res.weather;
    document.getElementById("apparentTemp").innerHTML = "Feels like: " + Math.round(res.temperature) + "&deg;C";
    document.getElementById("uv").innerHTML = "UV index: " + Math.round(res.uvIndex) + " of 10";
    document.getElementById("aqi").innerHTML = "Air Quality Index: " + Math.round(res.airQuality) + " /500";

}

// Countdown timer and length of trip
function setCountdown() {

    let tripStartDate = document.getElementById('date-start').value;
    let tripEndDate = document.getElementById('date-end').value;
    const countDownDate = new Date(tripStartDate);
    const tripLength = new Date(tripEndDate);

    const x = setInterval(() => {

        let now = new Date();
        let daysTil = countDownDate - now;
        let length = tripLength - countDownDate;

        let days = Math.floor(daysTil / (1000 * 60 * 60 * 24));
        let hours = Math.floor((daysTil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let end = Math.floor((length / (1000 * 60 * 60 * 24)));

        document.getElementById("countdown").innerHTML = `Get ready to travel in ${days} days and ${hours} hours. Enjoy your ${end} day vacation!`;

        if (daysTil < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "This trip has expired.";
        }
    }, 1000);
}

export {
    updateUI,
    setCountdown
}