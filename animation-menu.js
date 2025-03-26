// GSAP pour le menu
gsap.to(".menu li a", {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.5,
    ease: "power3.out"
});

// Effet de flottaison pour les titres
gsap.to(".animated-title", {
    yoyo: true,
    y: -10,
    duration: 1.5,
    ease: "power2.out",
    repeat: -1
});

// Effet de hover pour les boutons
gsap.utils.toArray(".about-btn").forEach(button => {
    gsap.to(button, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "center",
        scrollTrigger: {
            trigger: button,
            toggleActions: "play none none none"
        }
    });
});