const body = document.querySelector("body")

const keyValues = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
};

const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a']
let position = 0

//event listener on the full document, triggered on keydown
document.addEventListener('keydown', function (event) {
    // get the value of the key code from the key map
    const key = keyValues[event.keyCode];
    console.log(key)
    // get the value of the required key from the konami code
    const requiredKey = konamiCode[position];
    console.log(requiredKey)
    // compare the key with the required key
    if (key == requiredKey) {

        // move to the next key in the konami code sequence
        position++;

        // if the last key is reached, activate cheats
        if (position == konamiCode.length) {
            console.log("KONAMI!!")
            konAnimation();
            position = 0;
        }
    } else {
        position = 0;
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
    // debugger
    const iframe = main.querySelector("iframe")
    setTimeout(() => {removeIframeAndGet(iframe)}, 6000)
    
}