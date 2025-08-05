/**
 * Custom Banner Block
 * A customizable banner component with image, text, and call-to-action
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = Array.from(block.children);
  
  // Create banner structure
  const banner = document.createElement('div');
  banner.className = 'custom-banner-content';
  
  rows.forEach((row, index) => {
    const columns = Array.from(row.children);
    
    columns.forEach((column, colIndex) => {
      // Handle images
      const picture = column.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPicture = createOptimizedPicture(
            img.src, 
            img.alt, 
            false, 
            [{ width: '750' }]
          );
          const imageWrapper = document.createElement('div');
          imageWrapper.className = 'custom-banner-image';
          imageWrapper.appendChild(optimizedPicture);
          banner.appendChild(imageWrapper);
        }
      }
      
      // Handle text content
      const textContent = column.textContent.trim();
      if (textContent && !picture) {
        const textWrapper = document.createElement('div');
        textWrapper.className = `custom-banner-text custom-banner-text-${colIndex}`;
        textWrapper.innerHTML = column.innerHTML;
        banner.appendChild(textWrapper);
      }
      
      // Handle links as buttons
      const links = column.querySelectorAll('a');
      links.forEach(link => {
        link.className = 'custom-banner-button button primary';
      });
    });
  });
  
  // Replace block content
  block.innerHTML = '';
  block.appendChild(banner);
  
  // Add variant classes based on block classes
  if (block.classList.contains('center')) {
    banner.classList.add('center-aligned');
  }
  
  if (block.classList.contains('dark')) {
    banner.classList.add('dark-theme');
  }
}
