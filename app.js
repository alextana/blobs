'use strict';
const createParticles = ({
    // default values
    particleNumber = 140,
    particleSize = 2,
    colors = {
        firstColor: '#fff',
        secondColor: false,
    },
    randomizeSize = false,
    particleBorderRadius = 50,
    randomizeOpacity = false,
    randomizeColors = false,
    animation = false,
    animationDuration = 3,
    animationLoop = false,
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
        if (animation !== 'false') {
            animate();

            function animate() {
                // float animation + blobs animation
                if (animation === 'float' || animation === 'blobs') {
                    setTimeout(function animateParticles() {
                        isFinished = false;
                        animatedParticle = singleParticleElement[x].style;
                        if (isFinished === false) {
                            animatedParticle.top = Math.floor(Math.random() * canvasHeight) + 'px';
                            animatedParticle.left = Math.floor(Math.random() * canvasWidth) + 'px';
                            if (animation === 'float') {
                                animatedParticle.transition =
                                    `${animationDuration}s top ease-in-out, ${animationDuration}s left ease-in-out`;
                            }
                            if (animation === 'blobs') {
                                animatedParticle.transition =
                                    `
                            ${animationDuration}s border-radius ease-in-out, ${animationDuration}s top ease-in-out, ${animationDuration}s left ease-in-out`;
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
                            }, animationDuration * 1000);
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
- Open a controls menu (still to be decided how to style it) []
- make it draggable []
- use the controls button to change the function's parameters []
- output the code relevant to the configuration made by the user []
- have a button to let the user copy the code to the clipboard []
- build a section for documentation and how to use []
- add some fun presets []

*/





// call the functions on dom ready in vanilla js
document.addEventListener("DOMContentLoaded", function () {
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