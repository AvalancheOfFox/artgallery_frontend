const body = document.querySelector("body")
const africaMp3 = document.querySelector("#africaSong")



const keyValues = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    66: 'b',
    65: 'A',
    70: 'F',
    82: 'R',
    73: 'I',
    67: 'C',
    
};

//track our "winning" key combo
const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a']
const africaCode = ['A', 'F', 'R', 'I', 'C', 'A']

//track where we're at 
let positionK = 0
let positionA = 0

//function to actually play audio element
function playAfrica() {
    africaMp3.play()
}


//event listener on the full document, triggered on keydown
document.addEventListener('keydown', function (event) {
    // get the value of the key code from the key map
    const key = keyValues[event.keyCode];
    console.log(event, key)
    debugger
    // get the value of the required key from the konami code
    const requiredKeyKonami = konamiCode[positionK];
    const requiredKeyAfrica = africaCode[positionA];
    // compare the key with the required key
    if (key == requiredKeyKonami) {
        console.log(key)
        // move to the next key in the konami code sequence
        positionK++;
        // if the last key is reached, activate cheats
        if (positionK == konamiCode.length) {
            console.log("KONAMI!!")
            konAnimation();
            positionK = 0;
        }
    } else if (key == requiredKeyAfrica){
        positionA++;
        if (positionA == africaCode.length){
            playAfrica()
            positionA = 0
        }
    } else {
    positionA = 0;
    positionK = 0;
    }
});

function removeIframeAndGet(iframe){
    getArtworks()
   main.removeChild(iframe)
}


function konAnimation(){
    console.log("THIS IS IN KONIMATION")
    main.innerHTML = ''
    main.innerHTML += `
    <iframe width="1020" height="1280" src="https://www.youtube.com/embed/WEGCAS8nCPU?autoplay=true" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
    const iframe = main.querySelector("iframe")
    setTimeout(() => {removeIframeAndGet(iframe)}, 6000)
    
}