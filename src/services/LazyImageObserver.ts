// Custom Lazy Loader from scratch using OOP principles
class LazyImageObserver {
  private observer: IntersectionObserver | null = null;

  constructor() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const src = img.getAttribute('data-src');
              if (src) {
                // Add GSAP fade-in effect via CSS class or inline transition
                img.src = src;
                img.onload = () => img.classList.add('opacity-100');
                observer.unobserve(img);
              }
            }
          });
        },
        { rootMargin: '50px 0px', threshold: 0.1 }
      );
    }
  }

  observe(element: HTMLImageElement) {
    if (this.observer) {
      this.observer.observe(element);
    } else {
      // Fallback for very old browsers
      const src = element.getAttribute('data-src');
      if (src) element.src = src;
    }
  }

  unobserve(element: HTMLImageElement) {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }
}

export const lazyLoader = new LazyImageObserver();
