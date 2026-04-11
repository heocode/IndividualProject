const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const overlay = document.getElementById("nav-overlay");

function closeMenu() {
    nav.classList.remove("active");
    burger.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no_scroll");
}

if (burger && nav && overlay) {
    burger.addEventListener("click", () => {
        const isOpen = nav.classList.contains("active");
        if (isOpen) {
            closeMenu();
        } else {
            nav.classList.add("active");
            burger.classList.add("active");
            overlay.classList.add("active");
            document.body.classList.add("no_scroll");
        }
    });

    overlay.addEventListener("click", closeMenu);
}

const slides = document.querySelectorAll(".reviews__slide");
const dots = document.querySelectorAll(".reviews__dot");
let currentSlide = 0;
let slideTimer;

function goToSlide(index) {
    slides[currentSlide].classList.remove("reviews__slide--active");
    currentSlide = index;
    slides[currentSlide].classList.add("reviews__slide--active");

    dots.forEach((dot, i) => {
        dot.classList.toggle("reviews__dot--active", i <= currentSlide);
    });
}

function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
}

function startSlideTimer() {
    slideTimer = setInterval(nextSlide, 10000);
}

function resetSlideTimer() {
    clearInterval(slideTimer);
    startSlideTimer();
}

if (slides.length && dots.length) {
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            goToSlide(i);
            resetSlideTimer();
        });
    });

    const card = document.getElementById("reviews-card");
    let dragStartX = 0;
    const SWIPE_THRESHOLD = 50;

    card.addEventListener("touchstart", (e) => {
        dragStartX = e.touches[0].clientX;
    }, { passive: true });

    card.addEventListener("touchend", (e) => {
        const delta = dragStartX - e.changedTouches[0].clientX;
        if (Math.abs(delta) < SWIPE_THRESHOLD) return;
        if (delta > 0) {
            goToSlide((currentSlide + 1) % slides.length);
        } else {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }
        resetSlideTimer();
    }, { passive: true });


    startSlideTimer();
}
