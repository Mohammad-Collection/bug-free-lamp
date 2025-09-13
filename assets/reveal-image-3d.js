// Reveal Image to Video 3D JavaScript Component
class RevealImage3D {
  constructor(container) {
    this.container = container;
    this.video = container.querySelector('.reveal-video');
    this.image = container.querySelector('.reveal-image');
    this.isVideoPlaying = false;
    this.videoTimeout = null;
    
    this.init();
  }
  
  init() {
    // Preload video
    if (this.video) {
      this.video.preload = 'metadata';
      this.video.muted = true;
      this.video.loop = false;
      
      // Add event listeners
      this.container.addEventListener('click', this.handleClick.bind(this));
      this.container.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      this.container.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      
      // Video event listeners
      this.video.addEventListener('loadeddata', this.handleVideoLoaded.bind(this));
      this.video.addEventListener('ended', this.handleVideoEnded.bind(this));
    }
  }
  
  handleClick(event) {
    event.preventDefault();
    this.playVideo();
  }
  
  handleMouseEnter() {
    // Add hover effect but don't auto-play video
    this.container.classList.add('hovered');
  }
  
  handleMouseLeave() {
    this.container.classList.remove('hovered');
    
    // If video is playing, let it continue for the full 5 seconds
    if (!this.isVideoPlaying) {
      this.stopVideo();
    }
  }
  
  playVideo() {
    if (this.isVideoPlaying || !this.video) return;
    
    this.isVideoPlaying = true;
    this.container.classList.add('video-active', 'loading');
    
    // Check if it's a real video element or placeholder
    if (this.video.tagName === 'VIDEO') {
      // Play the video
      const playPromise = this.video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.container.classList.remove('loading');
            // Set timeout to stop video after 5 seconds
            this.videoTimeout = setTimeout(() => {
              this.stopVideo();
            }, 5000);
          })
          .catch((error) => {
            console.warn('Video play failed:', error);
            this.container.classList.remove('loading');
            this.stopVideo();
          });
      }
    } else {
      // Handle placeholder video (demo mode)
      setTimeout(() => {
        this.container.classList.remove('loading');
        // Set timeout to stop video after 5 seconds
        this.videoTimeout = setTimeout(() => {
          this.stopVideo();
        }, 5000);
      }, 500); // Simulate loading time
    }
  }
  
  stopVideo() {
    if (!this.video) return;
    
    this.isVideoPlaying = false;
    
    // Only call video methods if it's a real video element
    if (this.video.tagName === 'VIDEO') {
      this.video.pause();
      this.video.currentTime = 0;
    }
    
    this.container.classList.remove('video-active', 'loading');
    
    // Clear timeout
    if (this.videoTimeout) {
      clearTimeout(this.videoTimeout);
      this.videoTimeout = null;
    }
  }
  
  handleVideoLoaded() {
    // Video is ready to play
    this.container.classList.remove('loading');
  }
  
  handleVideoEnded() {
    // Video finished playing naturally
    this.stopVideo();
  }
  
  // Public method to trigger video programmatically
  trigger() {
    this.playVideo();
  }
  
  // Public method to reset the component
  reset() {
    this.stopVideo();
  }
}

// Auto-initialize all reveal image components
document.addEventListener('DOMContentLoaded', function() {
  const revealContainers = document.querySelectorAll('.reveal-image-container');
  
  revealContainers.forEach(container => {
    new RevealImage3D(container);
  });
});

// Intersection Observer for performance optimization
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const container = entry.target;
      const video = container.querySelector('.reveal-video');
      
      if (entry.isIntersecting) {
        // Preload video when in viewport
        if (video && video.tagName === 'VIDEO' && !video.preloaded) {
          video.load();
          video.preloaded = true;
        }
      } else {
        // Pause video when out of viewport
        if (video && !video.paused) {
          video.pause();
          container.classList.remove('video-active');
        }
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe all reveal image containers
  document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.reveal-image-container');
    containers.forEach(container => observer.observe(container));
  });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RevealImage3D;
}