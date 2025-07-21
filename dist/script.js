// Cache DOM elements for better performance
const elements = {
  rainbow: document.getElementById('rainbow'),
  nav: document.getElementById('nav'),
  header: document.getElementById('header'),
  body: document.body,
  more: document.getElementById('more'),
  scrollingElement: document.scrollingElement
};

let isBig = false;

function toggleView(shouldBeBig) {
  if (shouldBeBig === isBig) return; // Avoid unnecessary DOM operations
  
  if (shouldBeBig) {
    elements.rainbow.classList.remove("hidden");
    elements.nav.classList.add("big");
    elements.header.classList.add("big");
    elements.body.classList.add("big");
  } else {
    elements.nav.classList.remove("big");
    elements.header.classList.remove("big");
    elements.body.classList.remove("big");
    elements.rainbow.classList.add("hidden");
  }
  isBig = shouldBeBig;
}

// Initialize
toggleView(true);

// Optimized scroll handling with throttling
let wasZero = true;
let lastScroll = 0;
let ticking = false;

function handleScroll() {
  const scrollTop = elements.scrollingElement.scrollTop;
  
  if (scrollTop === 0 && lastScroll === 1) {
    toggleView(true);
    wasZero = true;
  } else if (scrollTop === 0) {
    elements.scrollingElement.scrollTop = 1;
  } else {
    if (wasZero) {
      toggleView(false);
      elements.scrollingElement.scrollTop = 1;
      wasZero = false;
      return;
    }
    wasZero = false;
  }
  lastScroll = scrollTop;
  ticking = false;
}

// Throttled scroll event
document.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
}, { passive: true });

// More button click handler
elements.more.addEventListener("click", () => {
  elements.scrollingElement.scrollTop = 1;
});

// Optimized title scroller with longer intervals
(function titleScroller(text) {
  document.title = text;
  setTimeout(() => {
    titleScroller(text.substr(1) + text.substr(0, 1));
  }, 800); // Increased from 500ms to 800ms for better performance
}("Himanshu Chandola "));

// Preload critical resources when idle
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload any additional resources if needed
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'https://github.com/himanshuchandola';
    document.head.appendChild(link);
  });
}
