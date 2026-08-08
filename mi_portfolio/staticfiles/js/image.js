document.addEventListener("DOMContentLoaded", function () {

    anime({
        targets: ".intro-image",
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 1000,
        easing: "easeOutElastic(1, .6)"
    });

    anime({
        targets: ".intro-text",
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 1000,
        delay: 300,
        easing: "easeOutElastic(1, .6)"
    });


    const flip = document.querySelector(".flip");

    flip.addEventListener("mouseenter", function () {

        anime({
            targets: flip,
            rotateY: 180,
            duration: 800,
            easing: "easeInOutQuad"
        });

    });

    flip.addEventListener("mouseleave", function () {

        anime({
            targets: flip,
            rotateY: 0,
            duration: 800,
            easing: "easeInOutQuad"
        });

    });

});