// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu responsive
    const toggleMenu = document.querySelector('.toggle-menu');
    const menu = document.querySelector('.menu');
    
    if (toggleMenu) {
        toggleMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    
    // Gestion du header au scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Gestion du slideshow sur la page d'accueil
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        
        // Fonction pour afficher un slide spécifique
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Initialisation du slideshow
        showSlide(0);
        
        // Événements pour les boutons précédent/suivant
        if (prevBtn) {
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        }
        
        // Événements pour les points de navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Défilement automatique
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }
    
    // Gestion du widget de chat
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.createElement('div');
    chatToggle.className = 'chat-toggle';
    chatToggle.innerHTML = '<i class="fas fa-comments"></i>';
    document.body.appendChild(chatToggle);
    
    chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('open');
    });
    
    const closeChat = document.querySelector('.close-chat');
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatWidget.classList.remove('open');
        });
    }
    
    const sendMessage = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (sendMessage && messageInput && chatMessages) {
        sendMessage.addEventListener('click', function() {
            const message = messageInput.value.trim();
            if (message !== '') {
                // Ajouter le message de l'utilisateur
                const userMessageDiv = document.createElement('div');
                userMessageDiv.className = 'message user';
                userMessageDiv.innerHTML = `<p>${message}</p>`;
                chatMessages.appendChild(userMessageDiv);
                
                // Réinitialiser l'input
                messageInput.value = '';
                
                // Faire défiler vers le bas
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simuler une réponse après un court délai
                setTimeout(function() {
                    const systemMessageDiv = document.createElement('div');
                    systemMessageDiv.className = 'message system';
                    systemMessageDiv.innerHTML = `<p>Merci pour votre message. Un membre de notre équipe vous répondra bientôt.</p>`;
                    chatMessages.appendChild(systemMessageDiv);
                    
                    // Faire défiler vers le bas
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        });
        
        // Permettre l'envoi du message avec la touche Entrée
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage.click();
            }
        });
    }
    
    // Animation au défilement
    const animatedElements = document.querySelectorAll('.animated');
    
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
    
    // Gestion des compteurs animés
    const counters = document.querySelectorAll('.counter');
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 50);
            } else {
                counter.innerText = target;
            }
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
    
    // Gestion de la galerie lightbox
    const galleryItems = document.querySelectorAll('.gallery-item a');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imgSrc = this.getAttribute('href');
            const imgTitle = this.getAttribute('title');
            
            // Créer une lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="${imgTitle}">
                    <div class="lightbox-caption">${imgTitle}</div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Fermer la lightbox
            const closeLightbox = lightbox.querySelector('.close-lightbox');
            closeLightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
            
            // Fermer la lightbox en cliquant en dehors de l'image
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
    
    // Gestion des filtres de la galerie
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (filterButtons.length > 0 && galleryGrid) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filtrer les éléments de la galerie
                const items = galleryGrid.querySelectorAll('.gallery-item');
                
                items.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Gestion des filtres de la galerie vidéo
    const videoFilterButtons = document.querySelectorAll('.video-filter-btn');
    const videoGrid = document.querySelector('.video-grid');
    
    if (videoFilterButtons.length > 0 && videoGrid) {
        videoFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                videoFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filtrer les éléments de la galerie vidéo
                const items = videoGrid.querySelectorAll('.video-item');
                
                items.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Gestion du bouton "Charger plus"
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simuler le chargement de plus d'éléments
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            
            setTimeout(() => {
                // Ici, vous pourriez charger plus d'éléments via AJAX
                // Pour cet exemple, nous allons simplement désactiver le bouton
                this.innerHTML = 'Tous les éléments sont chargés';
                this.disabled = true;
                this.style.backgroundColor = '#ccc';
                this.style.cursor = 'not-allowed';
            }, 2000);
        });
    }
    
    // Gestion du formulaire de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email !== '') {
                // Simuler l'envoi du formulaire
                const submitBtn = this.querySelector('button');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Afficher un message de succès
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Merci pour votre inscription !';
                    
                    newsletterForm.innerHTML = '';
                    newsletterForm.appendChild(successMessage);
                }, 2000);
            }
        });
    }
    
    // Initialisation des animations de particules
    const particlesBackground = document.getElementById('particles-background');
    
    if (particlesBackground) {
        particlesJS('particles-background', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#2e7d32'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#2e7d32',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});
