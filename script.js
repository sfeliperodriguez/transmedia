// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // Nav Navigation Elements
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const hintOverlay = document.getElementById('hint');
    
    // Panzoom Elements
    const elem = document.getElementById('panzoom-container');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const resetButton = document.getElementById('reset');

    // 1. Initialize Panzoom for Infography
    const panzoom = Panzoom(elem, {
        maxScale: 5,
        minScale: 0.5,
        step: 0.3,
        contain: 'outside'
    });

    // Enable wheel zooming
    elem.parentElement.addEventListener('wheel', (e) => {
        if (document.getElementById('section-infografia').classList.contains('active')) {
            hideHint();
            panzoom.zoomWithWheel(e);
        }
    });

    elem.addEventListener('panzoomstart', hideHint);

    function hideHint() {
        if (!hintOverlay.classList.contains('hidden')) {
            hintOverlay.classList.add('hidden');
        }
    }

    // Zoom Controls
    zoomInButton.addEventListener('click', () => {
        hideHint();
        panzoom.zoomIn();
    });
    
    zoomOutButton.addEventListener('click', () => {
        hideHint();
        panzoom.zoomOut();
    });
    
    resetButton.addEventListener('click', () => {
        hideHint();
        panzoom.reset();
    });

    // Auto-hide hint after 5 seconds
    setTimeout(hideHint, 5000);

    // 2. Tab / Sidebar Navigation Logic
    const navMenu = document.querySelector('.nav-menu');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // Si el menú está cerrado y damos click al botón activo, lo abrimos
                if (!navMenu.classList.contains('open') && item.classList.contains('active')) {
                    e.preventDefault();
                    e.stopPropagation();
                    navMenu.classList.add('open');
                    return;
                }
                // Si está abierto, se cierra al seleccionar cualquier opción
                navMenu.classList.remove('open');
            }

            const targetSectionId = item.getAttribute('data-target');
            if (!targetSectionId) return;
            
            // Update active state in navigation
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Switch visible section
            sections.forEach(section => {
                if (section.id === targetSectionId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // Pause videos when navigating away from videos section
            if (targetSectionId !== 'section-videos') {
                const videos = document.querySelectorAll('#section-videos video');
                videos.forEach(video => video.pause());
            }

            // Reset panzoom to center when opening infography
            if (targetSectionId === 'section-infografia') {
                panzoom.reset();
            }

            // Hide/Show mouse hint overlay depending on active section
            if (targetSectionId !== 'section-infografia') {
                hintOverlay.classList.add('hidden');
            }
        });
    });

    // Cerrar el menú desplegable si se hace click fuera de él
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && navMenu.classList.contains('open') && !navMenu.contains(e.target)) {
            navMenu.classList.remove('open');
        }
    });
});
