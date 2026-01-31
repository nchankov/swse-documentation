/**
 * Tab component functionality
 */
(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Find all tab containers
        const tabContainers = document.querySelectorAll('.tabs');
        
        tabContainers.forEach(function(container) {
            const buttons = container.querySelectorAll('.tab-button');
            const contents = container.querySelectorAll('.tab-content');
            
            // Add click handlers to buttons
            buttons.forEach(function(button, index) {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons and contents
                    buttons.forEach(function(btn) {
                        btn.classList.remove('active');
                    });
                    contents.forEach(function(content) {
                        content.classList.remove('active');
                    });
                    
                    // Add active class to clicked button and corresponding content
                    button.classList.add('active');
                    if (contents[index]) {
                        contents[index].classList.add('active');
                    }
                });
            });
            
            // Activate first tab by default if none are active
            if (!container.querySelector('.tab-button.active') && buttons.length > 0) {
                buttons[0].classList.add('active');
                if (contents[0]) {
                    contents[0].classList.add('active');
                }
            }
        });
    }
})();
