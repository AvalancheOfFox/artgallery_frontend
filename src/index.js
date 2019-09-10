const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const ARTWORKS_URL = `${BASE_URL}/artworks`

const main = document.querySelector("main")
const form = document.querySelector("form")
const createButton = document.querySelector("#create")
const wednesdayButton = document.querySelector(".wednesdayButton")

const allAudio = document.querySelector("audio")
const wednesdayAudio = document.getElementById("scream")




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
    let artistID = parseInt(event.target.artist.value)
    let newArtTitle = event.target.artworkTitle.value
    let newArtMedium = event.target.medium.value
    let newArtSource = event.target.source.value
    console.log(event)
    console.log(event.target)
    // debugger
    fetch(`${ARTWORKS_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            artist_id: artistID,
            title: newArtTitle,
            medium: newArtMedium,
            source: newArtSource,
        })
    })
        .then(res => res.json())
        .then(obj => {
            form.classList = 'hidden'
            console.log(obj);
            // debugger
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
    fetch(`${ARTWORKS_URL}/${artworkId}`, config)
    .then((  ) => getArtworks()) //end of fetch
}; //end of deleteArtwork


function editArtwork(event){

    console.log(event)
    // debugger
    //need to do some big NO animation
}




function buttonHandler(event) {
    if (event.target.classList.contains("delete")) {
        console.log("A delete button was clicked")
        deleteArtwork(event);
    } //doesn't auto update yet??
    else if (event.target.classList.contains("edit")) {
        event.preventDefault()
        allAudio.play()
        console.log("an edit button was clicked")
        editArtwork(event);
    }
   
}//end of button handler


//EVENT LISTENERS 


document.addEventListener("DOMContentLoaded", (e) => {
    getArtworks()
})//end of onLoad getArtworks()

main.addEventListener('click', buttonHandler);
//listens for button clicks on artwork divs

createButton.addEventListener('click', (event) => {
    createButton.classList = "hidden"
    wednesdayButton.classList = "hidden"
        form.classList = "visible"
    console.log(event, "a create button was clicked")
}) //reveals the form when Create button is clicked and hides
form.addEventListener('click', ()=>{
    form.classList = "hidden"
    createButton.classList = ""
    createButton.classList += "create"
    wednesdayButton.classList = ""
    wednesdayButton.classList = "wednesdayButton"
})

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    console.log("a submit button was clicked")
    addArtworkToDB(event);
    form.reset()
    form.classList = "hidden"
    createButton.classList = ""
    createButton.classList += "create"
    wednesdayButton.classList = ""
    wednesdayButton.classList = "wednesdayButton"
})//submits and triggers db creation as well as resting the form and hiding it


wednesdayButton.addEventListener("click", (e) => {
    e.preventDefault()
    wednesdayAudio.play()
})