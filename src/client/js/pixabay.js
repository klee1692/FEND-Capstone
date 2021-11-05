// getImage returns 3 image data results from Pixabay

async function getImage(event) {

    event.preventDefault();

    let searchTerm = document.getElementById("city-to").value;

    fetch('http://localhost:8081/getImage', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
    })
        .then(res => res.json())
        .then(function (res) {
            console.log(res);
            return res;
        })
        .then(function (res) {
            addImage(res);
        })
        .catch((error) => {
            console.log("error", error);
        });

};

// Add the first image link result to page 
function addImage(res) {
    document.getElementById('pixabay').setAttribute("src", res[0].imgMed);
}

export { getImage }