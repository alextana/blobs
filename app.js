'use strict';
// check how many times the menu has been opened
let counter = 0;
// create particles is the init function and these are the default properties
const createParticles = ({
    // default values
    particleNumber = 140,
    particleSize = 165,
    colors = {
        firstColor: '#fff',
        secondColor: false,
    },
    randomizeSize = true,
    particleBorderRadius = 50,
    randomizeOpacity = true,
    randomizeColors = true,
    animation = 'float',
    animationDuration = 20,
    animationLoop = true,
    blobs = false,
}) => {
    let particles, singleParticle, particleCanvas, canvasHeight,
        canvasWidth, singleParticleElement, particleStyle, particleTop,
        particleLeft, particleOpacity, randomSize, letters, color,
        animatedParticle, isFinished;

    // create particles
    particles = document.querySelector('.particles');
    for (let i = 0; i < particleNumber; i++) {
        singleParticle = document.createElement('div');
        singleParticle.classList.add('particle__element');
        particles.appendChild(singleParticle);
    }

    // get canvas and set width/height
    particleCanvas = document.querySelector('.particle__canvas');
    singleParticleElement = document.querySelectorAll('.particle__element');
    canvasHeight = particleCanvas.clientHeight;
    canvasWidth = particleCanvas.clientWidth;

    // apply styles to the single particles
    for (let x = 0; x < singleParticleElement.length; x++) {
        particleStyle = singleParticleElement[x].style;
        particleTop = Math.floor(Math.random() * canvasHeight);
        particleLeft = Math.floor(Math.random() * canvasWidth);
        particleOpacity = Math.random();
        particleStyle.position = 'absolute';
        // helper function to create min/max random values for blob radius
        function randomNumberHundredBlob() {
            // sweet spot for blob looking circles
            return Math.floor(Math.random() * (100 - 40) + 40);
        }
        if (blobs) {
            particleStyle.borderRadius =
                `
            ${randomNumberHundredBlob()}% ${randomNumberHundredBlob()}% 
            ${randomNumberHundredBlob()}% ${randomNumberHundredBlob()}%
            `;
        } else {
            particleStyle.borderRadius = particleBorderRadius + '%';
        }

        particleStyle.top = particleTop + 'px';
        particleStyle.left = particleLeft + 'px';


        // randomize opacity conditional -- start
        randomizeOpacity ? particleStyle.opacity = particleOpacity : particleStyle.opacity = 1;
        if (particleSize) {
            particleStyle.width = particleSize + 'px';
            particleStyle.height = particleSize + 'px';
        }
        // randomize opacity conditional -- end

        // randomize size conditional -- start
        if (randomizeSize) {
            randomSize = Math.floor(Math.random() * particleSize);
            particleStyle.width = randomSize + 'px';
            particleStyle.height = randomSize + 'px';
        }
        // randomize size conditional -- end

        // randomize colors conditional -- start
        if (randomizeColors) {
            letters = '0123456789ABCDEF';
            color = '#';
            for (var y = 0; y < 6; y++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            particleStyle.background = color;
        }
        // alternate the particles colors to have first / second
        // they're split in half checking the modulus of 2
        // only if secondColor is defined
        else if (colors.secondColor) {
            x % 2 === 0 ? particleStyle.background = colors.firstColor : particleStyle.background = colors.secondColor;
        }
        // otherwise only set first color
        else {
            particleStyle.background = colors.firstColor;
        }
        // randomize colors conditional -- end

        // animate function -- start
        if (animation !== false) {
            animate();
            function animate() {
                // float animation + blobs animation
                if (animation === 'float' || animation === 'blobs') {
                    setTimeout(function animateParticles() {
                        isFinished = false;
                        let randomAnimationDuration = Math.floor(Math.random() * animationDuration) + (animationDuration / 2);
                        animatedParticle = singleParticleElement[x].style;
                        if (isFinished === false) {
                            animatedParticle.top = Math.floor(Math.random() * canvasHeight) + 'px';
                            animatedParticle.left = Math.floor(Math.random() * canvasWidth) + 'px';
                            // float animation
                            if (animation === 'float') {
                                animatedParticle.transition =
                                    `${randomAnimationDuration}s top ease-in-out, ${randomAnimationDuration}s left ease-in-out`;
                            }
                            // blobs animation
                            if (animation === 'blobs') {
                                animatedParticle.transition =
                                    `
                            ${randomAnimationDuration}s border-radius ease-in-out, ${randomAnimationDuration}s top ease-in-out, ${randomAnimationDuration}s left ease-in-out`;
                                animatedParticle.borderRadius =
                                    `
                            ${randomNumberHundredBlob()}% ${randomNumberHundredBlob()}% 
                            ${randomNumberHundredBlob()}% ${randomNumberHundredBlob()}%
                            `;
                            }
                        }
                        // loop animation only if set up
                        if (animationLoop === true) {
                            setTimeout(() => {
                                isFinished = true;
                                if (isFinished === true) {
                                    singleParticleElement[x].style.top = Math.floor(Math.random() * canvasHeight) + 'px';
                                    singleParticleElement[x].style.left = Math.floor(Math.random() * canvasWidth) + 'px';
                                    isFinished = false;
                                    animateParticles();
                                }
                            }, randomAnimationDuration * 1000);
                        }
                    }, 1);
                }
            }
        }
        // animate function -- end
    }
}

/* BUILD CHECKLIST 
- Build a controls button [x]
- Open a controls menu (still to be decided how to style it) [x]
- Add all the sliders/radio buttons for it []
- use the controls button to change the function's parameters []
- output the code relevant to the configuration made by the user []
- have a button to let the user copy the code to the clipboard []
- build a section for documentation and how to use []
- add some fun presets (minecraft squares, space, christmas) []
*/


const controlsMenuStateHandler = () => {
    let controlsPanel, closeButton;
    controlsPanel = document.querySelector('.controls__output');
    controlsPanel.classList.add('controls__active');
    // close controls
    closeButton = document.querySelector('.controls__close');
    closeButton.addEventListener('click', function(){
        controlsPanel.classList.remove('controls__active');
        controlsOptions();
    });
}

const controlsOptions = () => {

    /* reinit defaults only the first time it's opened */



    /*
        RANGE SLIDERS 
    */

    let numberSlider, outputNumValue, numberValue,
        sizeSlider, outputSizeValue, sizeValue, 
        borderRadiusSlider, outputRadiusValue, borderRadiusValue,
        animationDurationSlider, outputDurationValue, animationDurationValue, animationDurationContainer;

    // declare sliders
    numberSlider = document.querySelector('.numberSlider');
    outputNumValue = document.querySelector('.numberValue');
    
    sizeSlider = document.querySelector('.sizeSlider');
    outputSizeValue = document.querySelector('.sizeValue');

    borderRadiusSlider = document.querySelector('.borderRadiusSlider');
    outputRadiusValue = document.querySelector('.borderRadiusValue');

    animationDurationSlider = document.querySelector('.animationDurationSlider');
    // to toggle enable and disable 
    animationDurationContainer = document.querySelector('.animation__duration');
    outputDurationValue = document.querySelector('.animationDurationValue');



    


    // set slider values with oninput function
    numberSlider.oninput = function() {
        outputNumValue.innerHTML = this.value;
    }
    sizeSlider.oninput = function() {
        outputSizeValue.innerHTML = this.value;
    }
    borderRadiusSlider.oninput = function() {
        outputRadiusValue.innerHTML = this.value;
    }
    animationDurationSlider.oninput = function() {
        outputDurationValue.innerHTML = this.value;
    }


    /* RADIO BUTTONS */

    // animation values for radio buttons 
    let radioFloat, radioBlobs, radioNoAnim, animationValue;
        radioFloat = document.getElementById('animatedFloat');
        radioBlobs = document.getElementById('animatedBlobs');
        radioNoAnim = document.getElementById('animatedNo');

        
        

    // randomize size values
    let randomSizeYes, randomSizeNo, randomSize;
        randomSizeYes = document.getElementById('randomSizeYes');
        randomSizeNo = document.getElementById('randomSizeNo'); 

    // randomize Color values
    let randomColorYes, randomColorNo, randomColor;
        randomColorYes = document.getElementById('randomColorYes');
        randomColorNo = document.getElementById('randomColorNo'); 


    // text input fields 

    let chooseColor1, chooseColor2, chooseColorsElement;
        chooseColor1 = document.getElementById('chooseColor1');
        chooseColor2 = document.getElementById('chooseColor2');
        chooseColorsElement = document.querySelector('.choose__colors');


        // conditional for text input color choice 
        // this needs a validation => check if the string is hex
        // if not hex don't run the function
        // maybe have a converter built in? 
        // so the user can use whichever value they prefer?
        let colorInput1, colorInput2;

        colorInput1 = document.querySelector('#chooseColor1');
        colorInput2 = document.querySelector('#chooseColor2');
         


    // default values for the first init
    if(counter === 0) {
    outputNumValue.innerHTML = '125';
    outputSizeValue.innerHTML = '150';
    outputRadiusValue.innerHTML = '50';
    outputDurationValue.innerHTML = '20';
    randomColorYes.checked = true;
    randomSizeYes.checked = true;
    radioFloat.checked = true;
    // choose colors hidden by default because 
    // randomise colours is set as true by default
    chooseColorsElement.classList.add('hidden');
    colorInput1.value = 'ff0000';
    colorInput2.value = '242424';
    counter++;
}   


    

    // resets the previous function call so selections don't stack up
    const refreshOutput = () => {
        const particles = document.querySelector('.particles');
        particles.innerHTML = '';
    }

    // on input change fire the function
    document.addEventListener('input', function() {
        numberValue = outputNumValue.innerHTML;
        sizeValue = outputSizeValue.innerHTML;
        borderRadiusValue = outputRadiusValue.innerHTML;
        animationDurationValue = outputDurationValue.innerHTML;
        animationValue = 'float';
        randomSize = true;

        // conditionals for animation Value
        if(radioFloat.checked === true) {
            animationValue = 'float';
            animationDurationContainer.classList.remove('hidden');
        } else if (radioBlobs.checked === true) {
            animationValue = 'blobs';
            animationDurationContainer.classList.remove('hidden');
        } else if(radioNoAnim.checked === true) {
            animationValue = false;
            // disable animationDuration
            animationDurationContainer.classList.add('hidden');
        }

        

        // conditionals for randomize size
        if(randomSizeYes.checked === true) {
            randomSize = true;
        } else if(randomSizeNo.checked === true) {
            randomSize = false;
        }

        // conditionals for randomize Color
        if(randomColorYes.checked === true) {
            chooseColorsElement.classList.add('hidden');
            randomColor = true;
            
        } else if(randomColorNo.checked === true) {
            chooseColorsElement.classList.remove('hidden');
            randomColor = false;
        }


       
        refreshOutput();
        createParticles({
            particleNumber: numberValue,
            particleSize: sizeValue,
            particleBorderRadius: borderRadiusValue,
            animationDuration: animationDurationValue,
            animation: animationValue,
            randomizeSize: randomSize,
            randomizeColors: randomColor,
            colors: {
                firstColor: '#' + colorInput1.value,
                secondColor: '#' + colorInput2.value
            }
        })

       
    })
 }
    // particle size slider
    const reinitFunction = () => {
        // whenever all the sliders are set and you click the button, the function is reinitialised
    }

// fps counter -- courtesy of Gregg Tavares: https://jsfiddle.net/greggman/ULxVp/
const fpsChecker = () => {
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.ieRequestAnimationFrame     ||
            function(callback){
              window.setTimeout(callback, 1000 / 60);
            };
  })();
  var fpsElement = document.querySelector(".fps__counter");
  var then = Date.now() / 1000;  // get time in seconds
  var render = function() {
      var now = Date.now() / 1000;  // get time in seconds
      // compute time since last frame
      var elapsedTime = now - then;
      then = now;
      // compute fps
      var fps = 1 / elapsedTime;
      fpsElement.innerText = fps.toFixed(2) + ' FPS';  
      requestAnimFrame(render);
  };
  render();
}

// call the functions on dom ready in vanilla js
document.addEventListener("DOMContentLoaded", function () {
    fpsChecker();
    createParticles({
        // set of values that override the defaults
        particleNumber: 170,
        particleSize: 165,
        randomizeSize: true,
        randomizeColors: true,
        particleBorderRadius: 50,
        blobs: true,
        randomizeOpacity: true,
        colors: {
            firstColor: 'blue',
            secondColor: 'lightblue'
        },
        animation: 'blobs',
        animationDuration: 20,
        animationLoop: true
    });
});