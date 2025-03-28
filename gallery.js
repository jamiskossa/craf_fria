document.addEventListener('DOMContentLoaded', function() {
    // Filtres de la galerie photo
    const photoFilterButtons = document.querySelectorAll('.photo-filter-btn');
    const photoItems = document.querySelectorAll('.gallery-item');
    
    if (photoFilterButtons.length > 0) {
        photoFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                photoFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filtrer les éléments de la galerie photo
                photoItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Filtres de la galerie vidéo
    const videoFilterButtons = document.querySelectorAll('.video-filter-btn');
    const videoItems = document.querySelectorAll('.video-item');
    
    if (videoFilterButtons.length > 0) {
        videoFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                videoFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filtrer les éléments de la galerie vidéo
                videoItems.forEach(item => {
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
    
    // Initialisation de Lightbox pour les images
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': "Image %1 sur %2",
        'fadeDuration': 300
    });
});
