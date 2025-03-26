
// Toggle menu pour les petits écrans
const toggleMenu = document.querySelector('.toggle-menu');
const menu = document.querySelector('.menu');

toggleMenu.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Animation des titres avec GSAP
gsap.to("h1", { duration: 1.5, opacity: 1, y: 0, ease: "power3.out" });

// Animation des sections au défilement
const sections = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in, .zoom-in');

sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%"
        },
        opacity: 0,
        y: section.classList.contains('slide-in-left') ? -50 : section.classList.contains('slide-in-right') ? 50 : 0,
        x: section.classList.contains('slide-in-left') ? -50 : section.classList.contains('slide-in-right') ? 50 : 0,
        scale: section.classList.contains('zoom-in') ? 0.8 : 1,
        duration: 1,
        ease: "power3.out"
    });
});

// Compteur pour les statistiques
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    gsap.to(counter, {
        scrollTrigger: {
            trigger: counter,
            start: "top 80%"
        },
        innerText: counter.getAttribute('data-target'),
        duration: 2,
        snap: { innerText: 1 }
    });
});

// Diaporama héro
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

// Bouton de défilement vers le haut
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Widget de chat
const chatToggle = document.querySelector('.chat-toggle');
const chatWidget = document.querySelector('.chat-widget');
const chatClose = document.querySelector('.chat-header button');

chatToggle.addEventListener('click', () => {
    chatWidget.style.display = 'flex';
});

chatClose.addEventListener('click', () => {
    chatWidget.style.display = 'none';
});