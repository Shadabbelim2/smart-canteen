const slider = document.querySelector('.review-slider');
const cards = document.querySelectorAll('.review-card');
const visibleCards = 3; // Number of visible cards
let currentIndex = 0;

function slideReviews() {
  // Calculate card width (including margin)
  const cardWidth = cards[0].offsetWidth + 20; // 20px is total margin (10px on each side)

  // Calculate how far to slide
  currentIndex++;
  if (currentIndex + visibleCards > cards.length) {
    currentIndex = 0; // Reset to start if it reaches the end
  }

  slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// Start sliding every 5 seconds
setInterval(slideReviews, 5000);
