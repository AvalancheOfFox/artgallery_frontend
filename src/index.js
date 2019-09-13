const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const ARTWORKS_URL = `${BASE_URL}/artworks`

const main = document.querySelector("main")
const form = document.querySelector("form")
const createButton = document.querySelector("#create")
const wednesdayButton = document.querySelector(".wednesdayButton")
const rossButton = document.querySelector(".bankAccount")
const span = document.querySelector("span")
const allAudio = document.querySelector("audio")
const wednesdayAudio = document.getElementById("scream")
const vegetaIsAngry = document.getElementById("angryvegeta")
const header = document.getElementsByTagName("header")

const adoptableURLS = ['https://www.rescuecity.nyc/pets-for-adoption/', 'https://www.aspca.org/nyc/aspca-adoption-center/adoptable-dogs', 'https://www.petfinder.com/animal-shelters-and-rescues/search/', 'https://www.roadogsandrescue.org/', 'https://www.google.com/aclk?sa=l&ai=DChcSEwit36rXhM7kAhXJwMgKHcvSAp8YABAAGgJxdQ&sig=AOD64_2ET93PMvQI6sZ0x2AKe3uIbN-iGA&q=&ved=2ahUKEwiZkp_XhM7kAhWu1lkKHT-QDyUQ0Qx6BAgOEAE&adurl=', 'https://www.google.com/aclk?sa=l&ai=DChcSEwit36rXhM7kAhXJwMgKHcvSAp8YABAIGgJxdQ&sig=AOD64_3QRVJRlIcbYLZLp6iR1rDxnsrPZQ&q=&ved=2ahUKEwiZkp_XhM7kAhWu1lkKHT-QDyUQ0Qx6BAgNEAE&adurl=',]
const goodBoy = document.querySelector("#goodBoy")



//initial fetch for all artworks
function getArtworks() {
    fetch(`${ARTWORKS_URL}`).then(res => res.json())
    .then((artworkObjArr) => {

        main.innerHTML = ""
        artworkObjArr.data.forEach(addArtworkToDOM)
    }) //end of fetch
} // end of getArtworks

//adds cards to the dom from array passed above
function addArtworkToDOM(artworkObj){
    // console.log(artworkObj)
    const attributes = artworkObj.attributes
    const artistObj = attributes.artist
    main.innerHTML += `<div class="card" data-id="${artworkObj.id}">
        <h3>${attributes.title}</h3>
        <img src="${attributes.source}" height="42" width="42">
        <p>Rendered in a medium of ${attributes.medium}</p>
        <p>Artist: ${artistObj.name}</p>
        <h6>Likes:</h6>
        <p id="likes-${artworkObj.id}"> ${attributes.likes} </p>
        <i class="em em---1"></i><br>
        <button class="delete" data-artwork-id=${artworkObj.id}>Delete this Art</button>
        <button class="edit" data-artwork-id=${artworkObj.id}>Edit this Art</button>
        <button class="multiply" data-artwork-id=${artworkObj.id}>Multiply</button>
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

function getSingleArtwork(event){
    const targetArtID = event.target.parentElement.dataset.id
    fetch(`${ARTWORKS_URL}/${targetArtID}`)
    .then(res => res.json())
    .then( (data) =>{
        let singleArtworkObj = data.data
        likesHandler(singleArtworkObj)
    })//end of single fetch
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
    } else if (event.target.classList.contains("multiply")){
        let artworkID = event.target.dataset.artworkId
        let numNode = document.querySelector(`#likes-${artworkID}`)
        let valueNode = parseInt(numNode.innerText)
        let multiplied = valueNode * 4
        numNode.innerText = multiplied
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ 'likes': multiplied })
        } //end of config
       
        fetch(`${ARTWORKS_URL}/${artworkID}`, config).then(res => res.json())
            .then(data => {
                // console.log(data)
            })
            if (multiplied>9000){
            vegetaIsAngry.play()}
        console.log(multiplied)
    } 
}//end of button handler

function closeWin() {
    myWindow.close();
}

function likesHandler(artworkObj){
    console.log(artworkObj)
    let currentVal = artworkObj.attributes.likes
    const config = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json" 
        },
        body: JSON.stringify({'likes': `${currentVal + 1}`}) 
    } //end of config
    fetch(`${ARTWORKS_URL}/${artworkObj.id}`, config).then(res => res.json())
    .then(data => {
        console.log(data)
        
        getArtworks()
    })
}


  



//EVENT LISTENERS 
document.addEventListener("DOMContentLoaded", (e) => {
    getArtworks()
})//end of onLoad getArtworks()

main.addEventListener('click', buttonHandler);
//listens for button clicks on artwork divs

// listens specifically for I clicks to fire likes
main.addEventListener("click", (event) => {
    if (event.target.tagName == "I"){
        //do more handling here to get the obj
        getSingleArtwork(event)
    }
})

//reveals the form and hides create/wednesday buttons
createButton.addEventListener('click', (event) => {
    createButton.classList = "hidden"
    wednesdayButton.classList = "hidden"
    form.classList = "visible"
    console.log(event, "a create button was clicked")
}) 

//adds event listener on the span 'hide me', changes button css
span.addEventListener('click', ()=>{
    form.classList = "hidden"
    createButton.classList = ""
    createButton.classList += "create"
    wednesdayButton.classList = ""
    wednesdayButton.classList = "wednesdayButton"
})

//submits and triggers db creation as well as reseting the form and hiding it
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
})

//triggers anonymous function to play wednesday sound
wednesdayButton.addEventListener("click", (e) => {
    e.preventDefault()
    wednesdayAudio.play()
})


goodBoy.addEventListener("click", (event) => {
    event.preventDefault()
    const targetUrl = adoptableURLS[Math.floor(Math.random() * adoptableURLS.length)]
    window.open(targetUrl)
    console.log("WOOF WOOF WOOF WOFO", event)
})

rossButton.addEventListener("click", (event)=>{
    event.preventDefault()
    if (event.target.classList.contains("bankAccount")) {
        console.log("I got clicked")
        // debugger
        myWindow = window.open("https://www.loljk.com")
        setTimeout(closeWin, 1000)
    }
})
