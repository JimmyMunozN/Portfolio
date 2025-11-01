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

// Variable para almacenar el ID del temporizador y poder cancelarlo
let animationTimerId = null;

const words = ["crecimiento", "formación"]; 
let wordIndex = 0;
const delayBeforeSwitch = 5000;

// Función auxiliar para obtener el elemento (usada en todas partes)
function getElement() {
    return document.getElementById('changing-text');
}

// ----------------------------------------------------
// Funciones de Animación (NO BLOQUEANTES por diseño de setTimeout)
// ----------------------------------------------------

function eraseWord() {
    const textElement = getElement();
    if (!textElement) {
        animationTimerId = null; // Limpiar ID si el elemento desaparece
        return;
    }

    const currentText = textElement.textContent;
    const currentLength = currentText.length;

    if (currentLength > 0) {
        textElement.textContent = currentText.substring(0, currentLength - 1);
        // Almacenar el ID del nuevo temporizador
        animationTimerId = setTimeout(eraseWord, 100); 
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        // Almacenar el ID del nuevo temporizador
        animationTimerId = setTimeout(typeWord, 300); 
    }
}

function typeWord() {
    const textElement = getElement();
    if (!textElement) {
        animationTimerId = null; // Limpiar ID si el elemento desaparece
        return;
    }

    const word = words[wordIndex];
    const currentText = textElement.textContent;

    if (currentText.length < word.length) {
        textElement.textContent += word.charAt(currentText.length);
        // Almacenar el ID del nuevo temporizador
        animationTimerId = setTimeout(typeWord, 150);
    } else {
        // Almacenar el ID del nuevo temporizador para el retraso largo
        animationTimerId = setTimeout(eraseWord, delayBeforeSwitch);
    }
}

// ----------------------------------------------------
// Función de Reinicio y Activación
// ----------------------------------------------------

export function typeAnimation() {
    if (animationTimerId !== null) {
        clearTimeout(animationTimerId);
        animationTimerId = null; 
    }
    
    wordIndex = 0; 

    const textElement = getElement();
    if (!textElement) return;

    // 2. Comienza la animación.
    // Si ya tiene el texto inicial, comienza a borrar después del delay.
    if (textElement.textContent === words[0]) {
        animationTimerId = setTimeout(eraseWord, delayBeforeSwitch);
    } 
    // Si está vacío (o tiene la otra palabra), comienza a escribir de inmediato.
    else {
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
