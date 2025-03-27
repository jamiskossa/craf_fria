document.addEventListener('DOMContentLoaded', function() {
    // Animation de la planète 3D
    const planet = document.querySelector('.planet-3d');
    
    if (planet) {
        // Créer la planète 3D
        const planetElement = document.createElement('div');
        planetElement.className = 'planet';
        planet.appendChild(planetElement);
        
        // Ajouter des continents à la planète
        for (let i = 0; i < 7; i++) {
            const continent = document.createElement('div');
            continent.className = 'continent';
            continent.style.transform = `rotateY(${i * 51.4}deg) rotateX(${Math.random() * 180 - 90}deg) translateZ(100px)`;
            planetElement.appendChild(continent);
        }
        
        // Animation de rotation
        let rotationY = 0;
        let autoRotate = true;
        
        function rotatePlanet() {
            if (autoRotate) {
                rotationY += 0.2;
                planetElement.style.transform = `rotateY(${rotationY}deg)`;
                requestAnimationFrame(rotatePlanet);
            }
        }
        
        rotatePlanet();
        
        // Interaction avec la souris
        planet.addEventListener('mouseenter', function() {
            autoRotate = false;
        });
        
        planet.addEventListener('mouseleave', function() {
            autoRotate = true;
            rotatePlanet();
        });
        
        planet.addEventListener('mousemove', function(e) {
            if (!autoRotate) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const rotateX = ((e.clientY - centerY) / 10) * -1;
                rotationY = (e.clientX - centerX) / 5 + rotationY;
                
                planetElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotationY}deg)`;
            }
        });
    }
    
    // Animation des membres de l'équipe
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            
            const photo = this.querySelector('.member-photo img');
            photo.style.transform = 'scale(1.1)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            
            const photo = this.querySelector('.member-photo img');
            photo.style.transform = 'scale(1)';
        });
    });
    
    // Animation des cartes de valeurs
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            
            const icon = this.querySelector('.value-icon');
            icon.style.transform = 'scale(1.2)';
            icon.style.color = 'var(--accent-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            
            const icon = this.querySelector('.value-icon');
            icon.style.transform = 'scale(1)';
            icon.style.color = 'var(--primary-color)';
        });
    });
    
    // Animation du slider des partenaires
    const partnersSlider = document.querySelector('.partners-slider');
    
    if (partnersSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        partnersSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            partnersSlider.style.cursor = 'grabbing';
            startX = e.pageX - partnersSlider.offsetLeft;
            scrollLeft = partnersSlider.scrollLeft;
        });
        
        partnersSlider.addEventListener('mouseleave', () => {
            isDown = false;
            partnersSlider.style.cursor = 'grab';
        });
        
        partnersSlider.addEventListener('mouseup', () => {
            isDown = false;
            partnersSlider.style.cursor = 'grab';
        });
        
        partnersSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - partnersSlider.offsetLeft;
            const walk = (x - startX) * 2; // Vitesse de défilement
            partnersSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Défilement automatique
        let scrollAmount = 0;
        const scrollSpeed = 1;
        const scrollDelay = 30;
        
        function autoScroll() {
            partnersSlider.scrollLeft += scrollSpeed;
            scrollAmount += scrollSpeed;
            
            if (scrollAmount >= partnersSlider.scrollWidth / 2) {
                partnersSlider.scrollLeft = 0;
                scrollAmount = 0;
            }
            
            setTimeout(autoScroll, scrollDelay);
        }
        
        // Démarrer le défilement automatique après un délai
        setTimeout(autoScroll, 2000);
    }
    
    // Animation de la section "Rejoignez-nous"
    const joinUsSection = document.querySelector('.join-us');
    
    if (joinUsSection) {
        window.addEventListener('scroll', function() {
            const sectionTop = joinUsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                joinUsSection.style.backgroundPosition = 'center calc(50% + ' + (sectionTop / 10) + 'px)';
            }
        });
    }
});
