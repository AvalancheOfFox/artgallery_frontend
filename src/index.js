const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const ARTWORKS_URL = `${BASE_URL}/artworks`

const main = document.querySelector("main")


document.addEventListener("DOMContentLoaded", (e) => {
    console.log('I am fully loaded and ready to rock')
    getArtworks()
})

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
    console.log(attributes)
    debugger
    main.innerHTML += `<div class="card" data-id="${artworkObj.id}">
        <h3>${attributes.title}</h3>
        <img src="${attributes.source}" height="42" width="42">
        <p>Rendered in a medium of ${attributes.medium}</p>
        <p> Artist: ${artistObj.name} </p>
        </div>`
}