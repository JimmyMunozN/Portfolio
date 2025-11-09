import { animate, stagger } from 'https://esm.sh/animejs';
import { componentAnimation } from "./animation.js";

export async function aboutStart() {
    componentAnimation('.fotoSection', '0', '0');
    fotoAnimationSequence();
}

function fotoAnimationSequence() {
    animate('#FotoAnimation path', {
        opacity: [0, 1],
        scale: [0, 1],
        duration: 200,
        delay: stagger(100),
        loop: false,
        complete: function() {
            animate('#profileFoto', {
                opacity: [0, 0.8],
                scale: [0, 1],
                duration: 400,
                easing: 'easeOutQuad'
            });
        }
    });
}