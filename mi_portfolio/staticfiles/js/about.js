document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    scale: [0.7, 1],
                    translateY: [50, 0],
                    duration: 800,
                    easing: "easeOutCubic"
                });

                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.2
    });


    cards.forEach(function (card) {
        observer.observe(card);
    });

});