document.addEventListener('DOMContentLoaded', function() {
    // Animation des éléments au défilement
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Vérifier au chargement initial
    
        // Animation du cube 3D du logo
        const cube = document.querySelector('.cube');
    
        if (cube) {
            // Ajouter une interaction au survol
            cube.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
            });
            
            cube.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
            });
        }
        
        // Animation des compteurs
        const counters = document.querySelectorAll('.counter');
        
        function animateCounters() {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // durée en millisecondes
                const increment = target / (duration / 50); // 50ms par étape
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        setTimeout(updateCounter, 50);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCounter();
            });
        }
        
        // Déclencher l'animation des compteurs lorsqu'ils sont visibles
        const statsSection = document.querySelector('.stats');
        
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateCounters();
                    observer.unobserve(statsSection);
                }
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
        
        // Animation de la planète 3D
        const planet = document.querySelector('.planet-3d');
        
        if (planet) {
            let rotationX = 0;
            let rotationY = 0;
            let isAnimating = true;
            
            function animatePlanet() {
                if (isAnimating) {
                    rotationY += 0.5;
                    planet.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
                    requestAnimationFrame(animatePlanet);
                }
            }
            
            animatePlanet();
            
            // Interaction au survol
            planet.addEventListener('mouseenter', function() {
                isAnimating = false;
            });
            
            planet.addEventListener('mouseleave', function() {
                isAnimating = true;
                animatePlanet();
            });
            
            // Interaction au mouvement de la souris
            planet.addEventListener('mousemove', function(e) {
                if (!isAnimating) {
                    const rect = this.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    rotationX = ((e.clientY - centerY) / 10) * -1;
                    rotationY = (e.clientX - centerX) / 10;
                    
                    this.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
                }
            });
        }
        
        // Animation de l'effet d'eau
        const waterEffect = document.querySelector('.water-effect-bg');
        
        if (waterEffect) {
            let phase = 0;
            
            function animateWater() {
                phase += 0.005;
                const y = Math.sin(phase) * 5;
                waterEffect.style.backgroundPosition = `0px ${y}px`;
                requestAnimationFrame(animateWater);
            }
            
            animateWater();
        }
        
        // Animation des titres de section 3D
        const sectionTitles3D = document.querySelectorAll('.section-title-3d h2');
        
        sectionTitles3D.forEach(title => {
            title.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const rotateX = ((e.clientY - centerY) / 20) * -1;
                const rotateY = (e.clientX - centerX) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            title.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
        
        // Animation des cartes au survol
        const cards = document.querySelectorAll('.objective-card, .service-card, .news-card, .team-member, .value-card, .contact-method');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
        
        // Animation du bouton de défilement vers le haut
        const scrollTopBtn = document.querySelector('.scroll-top');
        
        if (scrollTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    scrollTopBtn.classList.add('show');
                } else {
                    scrollTopBtn.classList.remove('show');
                }
            });
            
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Animation des images de la galerie au survol
        const galleryImages = document.querySelectorAll('.gallery-item img');
        
        galleryImages.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Animation du texte de défilement
        const typingTexts = document.querySelectorAll('.typing-text');
        
        typingTexts.forEach(text => {
            const originalText = text.textContent;
            const textLength = originalText.length;
            
            text.textContent = '';
            
            let i = 0;
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    const typingInterval = setInterval(() => {
                        if (i < textLength) {
                            text.textContent += originalText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typingInterval);
                        }
                    }, 50);
                    
                    observer.unobserve(text);
                }
            }, { threshold: 0.5 });
            
            observer.observe(text);
        });
        
        // Animation des boutons
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-accent, .btn-more');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            });
        });
        
        // Animation des liens du menu
        const menuLinks = document.querySelectorAll('.menu li a');
        
        menuLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = 'var(--primary-color)';
                    const after = window.getComputedStyle(this, '::after');
                    this.style.setProperty('--after-width', '100%');
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = 'var(--text-color)';
                    this.style.setProperty('--after-width', '0');
                }
            });
        });
    });
    