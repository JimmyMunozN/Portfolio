import { componentAnimation } from "./animation.js";

export async function portfolioStart() {
    portfolioContent();
    componentAnimation('.portfolio', '-32vw', '-5rem');
    projectCarousel();
}

function portfolioContent() {
    
    const projectButton = document.querySelector('.projectsButton');
    const techStackButton = document.querySelector('.techStackButton');

    projectButton.addEventListener('click', () => {
        componentAnimation('.portfolio', '-30vw', '-5rem');
    });

    techStackButton.addEventListener('click', () => {
        componentAnimation('.techStack', '-30vw', '-2rem');
    });
}

function projectCarousel () {
    let amount = 6;
    var carousel = $(".carousel"),
        currdeg  = 0;

    const cube = document.getElementById('animationCube');

    const projects = carousel.find('.project');

    $(".next").on("click", { d: "n" }, rotate);
    $(".prev").on("click", { d: "p" }, rotate);
    
    function updateFrontProject() {
        let normalizedDeg = currdeg % 360;
        if (normalizedDeg < 0) {
            normalizedDeg += 360;
        }
        const anglePerProject = 360 / amount;

        let frontIndex = Math.round(normalizedDeg / anglePerProject);

        let actualFrontIndex = (amount - frontIndex) % amount;

        if (!projects.eq(actualFrontIndex).hasClass('b')) {
            cube.classList.remove('is-3d');
        }

        if (projects.eq(actualFrontIndex).hasClass('b')) {
            cube.classList.add('is-3d');
        }

        projects.removeClass('is-front');

        projects.eq(actualFrontIndex).addClass('is-front');
    }

    function rotate(e){
        if(e.data.d=="n"){
            currdeg = currdeg - (360/amount);
        }
        if(e.data.d=="p"){
            currdeg = currdeg + (360/amount);
        }
        
        let transformValue = `rotateY(${currdeg}deg)`;
        
        carousel.css({
            "transform": transformValue
        });

        setTimeout(updateFrontProject, 1000 / 2);
    }

    updateFrontProject();
}
