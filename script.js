// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    const elem = document.getElementById('panzoom-container');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const resetButton = document.getElementById('reset');
    const hintOverlay = document.getElementById('hint');
    
    // Modal elements
    const videoModal = document.getElementById('video-modal');
    const openVideosBtn = document.getElementById('open-videos');
    const closeVideosBtn = document.getElementById('close-videos');
    
    // PDF Modal elements
    const pdfModal = document.getElementById('pdf-modal');
    const openPdfBtn = document.getElementById('open-pdf');
    const closePdfBtn = document.getElementById('close-pdf');
    
    // Initialize Panzoom
    const panzoom = Panzoom(elem, {
        maxScale: 5,
        minScale: 0.5,
        step: 0.3,
        contain: 'outside' // Keeps the image roughly within bounds
    });

    // Enable wheel zooming
    elem.parentElement.addEventListener('wheel', (e) => {
        // Hide hint on first interaction
        hideHint();
        panzoom.zoomWithWheel(e);
    });

    // Hide hint on drag
    elem.addEventListener('panzoomstart', hideHint);

    function hideHint() {
        if (!hintOverlay.classList.contains('hidden')) {
            hintOverlay.classList.add('hidden');
        }
    }

    // Controls
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

    // Modal Controls
    openVideosBtn.addEventListener('click', () => {
        videoModal.classList.remove('hidden');
    });

    closeVideosBtn.addEventListener('click', () => {
        videoModal.classList.add('hidden');
        // Stop videos when closing modal
        const videos = videoModal.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });
    });

    // Close video modal when clicking outside content
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideosBtn.click();
        }
    });

    // PDF Modal Controls
    openPdfBtn.addEventListener('click', () => {
        pdfModal.classList.remove('hidden');
    });

    closePdfBtn.addEventListener('click', () => {
        pdfModal.classList.add('hidden');
    });

    // Close PDF modal when clicking outside content
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            closePdfBtn.click();
        }
    });

    // Auto-hide hint after 5 seconds if no interaction
    setTimeout(hideHint, 5000);
});
