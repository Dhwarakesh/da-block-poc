/**
 * Testimonial Block
 * Displays customer testimonials with author info
 */

export default function decorate(block) {
  // Get all rows from the block
  [...block.children].forEach((row) => {
    const [quoteCell, authorCell, imageCell] = row.children;
    // Create testimonial item container
    const testimonialItem = document.createElement('div');
    testimonialItem.className = 'testimonial-item';

    // Process quote
    if (quoteCell) {
      const quote = document.createElement('blockquote');
      quote.className = 'testimonial-quote';
      quote.innerHTML = quoteCell.innerHTML;
      testimonialItem.appendChild(quote);
    }

    // Create author section
    const authorSection = document.createElement('div');
    authorSection.className = 'testimonial-author';

    // Process author image
    if (imageCell && imageCell.querySelector('img')) {
      const authorImage = document.createElement('div');
      authorImage.className = 'testimonial-author-image';
      const img = imageCell.querySelector('img');
      img.alt = img.alt || 'Author photo';
      authorImage.appendChild(img);
      authorSection.appendChild(authorImage);
    }

    // Process author info
    if (authorCell) {
      const authorInfo = document.createElement('div');
      authorInfo.className = 'testimonial-author-info';
      authorInfo.innerHTML = authorCell.innerHTML;
      authorSection.appendChild(authorInfo);
    }

    testimonialItem.appendChild(authorSection);

    // Replace the original row with the decorated testimonial item
    row.replaceWith(testimonialItem);
  });
}
