/**
 * Code block copy functionality
 * Allows users to click on <pre><code> blocks to copy their content
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
        // Find all pre.copy > code blocks
        const codeBlocks = document.querySelectorAll('pre.copy code');
        
        codeBlocks.forEach(function(codeBlock) {
            const pre = codeBlock.parentElement;
            
            // Make the pre element clickable
            pre.style.cursor = 'pointer';
            pre.style.position = 'relative';
            
            // Create hover hint element
            const hoverHint = document.createElement('div');
            hoverHint.textContent = 'Click to copy';
            hoverHint.style.position = 'absolute';
            hoverHint.style.top = '10px';
            hoverHint.style.right = '10px';
            hoverHint.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            hoverHint.style.color = 'white';
            hoverHint.style.padding = '6px 10px';
            hoverHint.style.borderRadius = '4px';
            hoverHint.style.fontSize = '12px';
            hoverHint.style.zIndex = '1000';
            hoverHint.style.pointerEvents = 'none';
            hoverHint.style.opacity = '0';
            hoverHint.style.transition = 'opacity 0.2s ease-in-out';
            hoverHint.className = 'copy-hover-hint';
            
            pre.appendChild(hoverHint);
            
            // Show hint on hover
            pre.addEventListener('mouseenter', function() {
                hoverHint.style.opacity = '1';
            });
            
            pre.addEventListener('mouseleave', function() {
                hoverHint.style.opacity = '0';
            });
            
            // Add click event listener
            pre.addEventListener('click', function(e) {
                copyToClipboard(codeBlock.textContent, pre);
            });
        });
    }

    function copyToClipboard(text, element) {
        // Try modern clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function() {
                showCopiedTooltip(element);
            }).catch(function(err) {
                // Fallback to older method
                fallbackCopyTextToClipboard(text, element);
            });
        } else {
            // Fallback for older browsers
            fallbackCopyTextToClipboard(text, element);
        }
    }

    function fallbackCopyTextToClipboard(text, element) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopiedTooltip(element);
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }

    function showCopiedTooltip(element) {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Copied!';
        tooltip.style.position = 'absolute';
        tooltip.style.top = '10px';
        tooltip.style.right = '10px';
        tooltip.style.backgroundColor = '#4CAF50';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '14px';
        tooltip.style.fontWeight = 'bold';
        tooltip.style.zIndex = '1000';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.2s ease-in-out';
        
        // Add tooltip to the pre element
        element.appendChild(tooltip);
        
        // Trigger animation
        setTimeout(function() {
            tooltip.style.opacity = '1';
        }, 10);
        
        // Remove tooltip after 2 seconds
        setTimeout(function() {
            tooltip.style.opacity = '0';
            setTimeout(function() {
                if (tooltip.parentElement) {
                    tooltip.parentElement.removeChild(tooltip);
                }
            }, 200);
        }, 2000);
    }
})();
