const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const ARTWORKS_URL = `${BASE_URL}/artworks`

const main = document.querySelector("main")




//initial fetch for all arts
function getArtworks() {
    fetch(`${ARTWORKS_URL}`).then(res => res.json())
    .then((artworkObjArr) => {
        main.innerHTML = ""
        artworkObjArr.data.forEach(addArtworkToDOM)
    }) //end of fetch
} // end of getArtworks


function addArtworkToDOM(artworkObj){
    const attributes = artworkObj.attributes
    const artistObj = attributes.artist
    main.innerHTML += `<div class="card" data-id="${artworkObj.id}">
        <h3>${attributes.title}</h3>
        <img src="${attributes.source}" height="42" width="42">
        <p>Rendered in a medium of ${attributes.medium}</p>
        <p>Artist: ${artistObj.name}</p>
        <button class="delete" data-artwork-id=${artworkObj.id}>Delete this Art</button>
        <button class="edit" data-artwork-id=${artworkObj.id}>Edit this Art</button>
        </div>`
}

function addArtworkToDB(event) {
    console.log(event)
    console.log(event.target.dataset)
    debugger
    fetch(ARTWORKS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            artist_id: artistID
        })
    })
        .then(res => res.json())
        .then(obj => {
            console.log(obj);
            getArtworks();
        })
}

function deleteArtwork(event){
    event.preventDefault()
    const artworkId = event.target.dataset.artworkId
    const config = {
        method: "DELETE",
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }
    console.log(event.target.attributes)
    debugger
    fetch(`${ARTWORKS_URL}/${artworkId}`, config)
    .then(response => response.json())
    .then(obj => getArtworks()) //end of fetch
}; //end of deleteArtwork

function buttonHandler(event) {
    if (event.target.classList.contains("delete")) {
        console.log("A delete button was clicked")
        deleteArtwork(event);
    }
    else if (event.target.classList.contains("edit")) {
        console.log("an edit button was clicked")
        // editArtwork(event);
    }
    else if (event.target.classList.contains("create")) {
        console.log("a create button was clicked")
        addArtworkToDB(event);
    }
}//end of button handler

document.addEventListener("DOMContentLoaded", (e) => {
    getArtworks()
})//end of onLoad getArtworks

main.addEventListener('click', buttonHandler);
//listens for button clicks
