// Main Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 800);
    }

    // Module Navigation Logic
    const moduleTabs = document.querySelectorAll('.module-sidebar li');
    const moduleContents = document.querySelectorAll('.module-content');

    if (moduleTabs.length > 0) {
        moduleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active classes
                moduleTabs.forEach(t => t.classList.remove('active'));
                moduleContents.forEach(c => c.classList.remove('active'));
                
                // Add active class
                tab.classList.add('active');
                const targetId = tab.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');

                // Mark previous as complete (simple simulation)
                ProgressTracker.markModuleComplete(targetId);
            });
        });
    }

    // Interactive Phishing Email Logic
    const phishSpots = document.querySelectorAll('.phish-spot');
    phishSpots.forEach(spot => {
        spot.addEventListener('click', () => {
            spot.classList.toggle('revealed');
        });
    });
});