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

    res.forEach((img, i) => {
        let imgContainer = document.getElementById("city-image")
        let imgSlot = document.createElement('img');

        imgSlot.setAttribute("src", img.imgMed)
        imgContainer.appendChild(imgSlot);
    });

    // for (let img of res) {
    //     let imgContainer = document.getElementById("city-image")
    //     let imgSlot = document.createElement('img');
    //     imgSlot.setAttribute("src", img[i].imgMed)
    //     imgContainer.appendChild(imgSlot)
    // }

}

export { getImage }