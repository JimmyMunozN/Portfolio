import { animate, svg, stagger } from 'https://esm.sh/animejs';
import { componentAnimation } from "./animation.js";

export async function homeStart() {
    componentAnimation('.homeAnimation', '0', '0');
    initialScale();
    animateStatistics();
    animateStatus();
    animateData();
    typeAnimation();
}

let animationTimerId = null;

const words = ["crecimiento", "formación"]; 
let wordIndex = 0;
const delayBeforeSwitch = 5000;

function getElement() {
    return document.getElementById('changing-text');
}

function eraseWord() {
    const textElement = getElement();
    if (!textElement) {
        animationTimerId = null;
        return;
    }

    const currentText = textElement.textContent;
    const currentLength = currentText.length;

    if (currentLength > 0) {
        textElement.textContent = currentText.substring(0, currentLength - 1);
        animationTimerId = setTimeout(eraseWord, 100); 
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        animationTimerId = setTimeout(typeWord, 300); 
    }
}

function typeWord() {
    const textElement = getElement();
    if (!textElement) {
        animationTimerId = null;
        return;
    }

    const word = words[wordIndex];
    const currentText = textElement.textContent;

    if (currentText.length < word.length) {
        textElement.textContent += word.charAt(currentText.length);
        animationTimerId = setTimeout(typeWord, 150);
    } else {
        animationTimerId = setTimeout(eraseWord, delayBeforeSwitch);
    }
}

function typeAnimation() {
    if (animationTimerId !== null) {
        clearTimeout(animationTimerId);
        animationTimerId = null; 
    }
    
    wordIndex = 0; 

    const textElement = getElement();
    if (!textElement) return;

    if (textElement.textContent === words[0]) {
        animationTimerId = setTimeout(eraseWord, delayBeforeSwitch);
    } else {
        typeWord();
    }
}

function initialScale() {
    animate('#HomeCoreAnimation path', {
        opacity: [0, 1],
        translateX: ['2rem', 0],
        translateY: ['2rem', 0],
        scale: [0, 1],
        duration: 200,
        delay: stagger(100),
        loop: false
    });
}

function animateStatus() {
    animate(svg.createDrawable('#status path'), {
        draw: ['0 0', '0 1', '1  1'],
        ease: 'inOutQuad',
        duration: 1000,
        delay: stagger(200),
        loop: true,
        alternate: true
    });
}

function animateStatistics() {
    animate(svg.createDrawable('#statistics path'), {
        draw: ['0 0', '0 1', '1  1'],
        ease: 'inOutQuad',
        duration: 2000,
        delay: stagger(400),
        loop: true,
        alternate: true
    });
}

function animateData() {
    animate(svg.createDrawable('#data'), {
        draw: ['0 0', '0 1', '1  1'],
        ease: 'inOutQuad',
        duration: 4000,
        loop: true,
        alternate: true
    });
}
