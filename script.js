const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0,
    yValue = 0;

let rotateDegree = 0;

function update(cursorPositionX, cursorPositionY) {
    parallax_el.forEach((el) => {
        let speedx = parseFloat(el.dataset.speedx) || 0;
        let speedy = parseFloat(el.dataset.speedy) || 0;
        let speedz = parseFloat(el.dataset.speedz) || 0;
        let rotationSpeed = parseFloat(el.dataset.rotation) || 0;

        let isInLeft =
            parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPositionX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `translateX(calc(-50% + ${xValue * speedx}px)) 
                              translateY(calc(-50% + ${yValue * speedy}px))
                              perspective(2300px) translateZ(${zValue * speedz}px)
                              rotateY(${rotateDegree * rotationSpeed}deg)`;
    })
}

update(0, 0);

window.addEventListener("mousemove", (e) => {

    if(timeline.isActive()) return;

    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX, e.clientY);
})

// GSAP Animation
const timeline = gsap.timeline()

Array.from(parallax_el)
    .filter(el => !el.classList.contains("text"))
    .forEach((el) => {
    timeline.from(
        el, 
        {
            top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
            duration: 3.5,
            ease: "power3.out",
        },
        "1"
    );
});

timeline.from(".text h1", {
    y: (window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top) + 100,
       duration: 2,
    },
    2
).from(".text h2", {
    y: -150,
    opacity: 0,
    duration: 1.5,
    },
    3
)

.from(".hide", {
    opacity: 0,
    duration: 1.5,
    },
    3
)
