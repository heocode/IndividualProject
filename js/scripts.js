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

// ── Contact modal ──
const openModalBtn = document.getElementById("open-contact-modal");
const contactModal = document.getElementById("contact-modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");

function openModal() {
    contactModal.classList.add("modal--open");
    document.body.classList.add("no_scroll");
}

function closeModal() {
    contactModal.classList.remove("modal--open");
    document.body.classList.remove("no_scroll");
}

const openModalNavBtn = document.getElementById("open-contact-modal-nav");

function showSuccess(container, isModal) {
    container.innerHTML = `
        <div class="form-success">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11" stroke="#1e40af" stroke-width="2"/>
                <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#1e40af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3 class="form-success__title">Request Sent!</h3>
            <p class="form-success__text">Thank you for reaching out. We'll get back to you within 24 hours.</p>
            ${isModal ? '<button class="btn form-success__btn" id="success-close">Close</button>' : ''}
        </div>
    `;
    if (isModal) {
        document.getElementById("success-close").addEventListener("click", () => {
            closeModal();
            setTimeout(() => { container.innerHTML = ""; }, 400);
        });
    }
}

if (openModalBtn && contactModal) {
    openModalBtn.addEventListener("click", openModal);
    if (openModalNavBtn) openModalNavBtn.addEventListener("click", () => { closeMenu(); openModal(); });
    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && contactModal.classList.contains("modal--open")) {
            closeModal();
        }
    });

    const modalForm = contactModal.querySelector(".modal__form");
    if (modalForm) {
        modalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!modalForm.checkValidity()) {
                modalForm.reportValidity();
                return;
            }
            showSuccess(contactModal.querySelector(".modal__card"), true);
        });
    }
}

// ── Contact page form ──
const contactPageForm = document.querySelector(".contact__form");
if (contactPageForm) {
    contactPageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!contactPageForm.checkValidity()) {
            contactPageForm.reportValidity();
            return;
        }
        showSuccess(contactPageForm.closest(".contact__form-wrap"), false);
    });
}

// ── Screenshot lightbox ──
const screenshotImages = document.querySelectorAll(".ea-screenshot__image");

if (screenshotImages.length) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <button class="lightbox__close" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
        </button>
        <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <img class="lightbox__img" src="" alt="" />
        <button class="lightbox__nav lightbox__nav--next" aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18l6-6-6-6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="lightbox__dots"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector(".lightbox__img");
    const lightboxClose = lightbox.querySelector(".lightbox__close");
    const lightboxPrev = lightbox.querySelector(".lightbox__nav--prev");
    const lightboxNext = lightbox.querySelector(".lightbox__nav--next");
    const lightboxDots = lightbox.querySelector(".lightbox__dots");

    const images = Array.from(screenshotImages);
    let currentIndex = 0;

    // Build dots
    images.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "lightbox__dot";
        dot.setAttribute("aria-label", `Image ${i + 1}`);
        dot.addEventListener("click", (e) => { e.stopPropagation(); goTo(i); });
        lightboxDots.appendChild(dot);
    });

    const dotEls = lightboxDots.querySelectorAll(".lightbox__dot");

    function goTo(index) {
        currentIndex = (index + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
        dotEls.forEach((d, i) => d.classList.toggle("lightbox__dot--active", i === currentIndex));
        lightboxPrev.style.display = images.length > 1 ? "flex" : "none";
        lightboxNext.style.display = images.length > 1 ? "flex" : "none";
        lightboxDots.style.display = images.length > 1 ? "flex" : "none";
    }

    function openLightbox(index) {
        goTo(index);
        lightbox.classList.add("lightbox--active");
        document.body.classList.add("no_scroll");
    }

    function closeLightbox() {
        lightbox.classList.remove("lightbox--active");
        document.body.classList.remove("no_scroll");
    }

    images.forEach((img, i) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => openLightbox(i));
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", (e) => { e.stopPropagation(); goTo(currentIndex - 1); });
    lightboxNext.addEventListener("click", (e) => { e.stopPropagation(); goTo(currentIndex + 1); });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("lightbox--active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") goTo(currentIndex - 1);
        if (e.key === "ArrowRight") goTo(currentIndex + 1);
    });
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
