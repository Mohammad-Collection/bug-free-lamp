/**
 * Reveal Image JavaScript
 * Handles the reveal effect from image to 5-second 3D video
 */

class RevealImage {
  constructor() {
    this.revealSections = document.querySelectorAll('.reveal-image-section');
    this.init();
  }

  init() {
    this.revealSections.forEach(section => this.setupRevealSection(section));
  }

  setupRevealSection(section) {
    const wrapper = section.querySelector('.reveal-image-wrapper');
    const video = section.querySelector('.reveal-video-element');
    const trigger = section.dataset.revealTrigger || 'hover';
    const duration = parseInt(section.dataset.videoDuration) || 5;

    if (!wrapper || !video) return;

    // Set video duration
    this.enforceVideoDuration(video, duration);

    if (trigger === 'hover') {
      this.setupHoverTrigger(wrapper, video, duration);
    } else if (trigger === 'click') {
      this.setupClickTrigger(wrapper, video, duration);
    }
  }

  setupHoverTrigger(wrapper, video, duration) {
    let isPlaying = false;
    let timeoutId = null;

    wrapper.addEventListener('mouseenter', () => {
      if (isPlaying) return;
      
      wrapper.classList.add('reveal-active');
      this.playVideo(video, duration);
      isPlaying = true;

      // Add 3D animation class
      wrapper.classList.add('autoplay-3d');
    });

    wrapper.addEventListener('mouseleave', () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      wrapper.classList.remove('reveal-active', 'autoplay-3d');
      this.stopVideo(video);
      isPlaying = false;
    });
  }

  setupClickTrigger(wrapper, video, duration) {
    let isRevealed = false;

    wrapper.addEventListener('click', () => {
      if (isRevealed) {
        wrapper.classList.remove('reveal-active', 'autoplay-3d');
        this.stopVideo(video);
        isRevealed = false;
      } else {
        wrapper.classList.add('reveal-active', 'autoplay-3d');
        this.playVideo(video, duration);
        isRevealed = true;

        // Auto-hide after video ends
        setTimeout(() => {
          wrapper.classList.remove('reveal-active', 'autoplay-3d');
          this.stopVideo(video);
          isRevealed = false;
        }, duration * 1000 + 500);
      }
    });
  }

  playVideo(video, duration) {
    video.currentTime = 0;
    video.play().catch(error => {
      console.warn('Video autoplay failed:', error);
    });

    // Ensure video stops after specified duration
    setTimeout(() => {
      this.stopVideo(video);
    }, duration * 1000);
  }

  stopVideo(video) {
    video.pause();
    video.currentTime = 0;
  }

  enforceVideoDuration(video, maxDuration) {
    video.addEventListener('loadedmetadata', () => {
      if (video.duration > maxDuration) {
        console.warn(`Video duration (${video.duration}s) exceeds maximum (${maxDuration}s)`);
      }
    });

    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= maxDuration) {
        this.stopVideo(video);
      }
    });
  }
}

// Enhanced 3D Effects
class RevealImage3D {
  constructor() {
    this.setupAdvanced3DEffects();
  }

  setupAdvanced3DEffects() {
    const wrappers = document.querySelectorAll('.reveal-image-wrapper');
    
    wrappers.forEach(wrapper => {
      this.addMouseTracking3D(wrapper);
      this.addRandomFloat3D(wrapper);
    });
  }

  addMouseTracking3D(wrapper) {
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      const rotateX = deltaY * -10;
      const rotateY = deltaX * 10;
      
      wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  addRandomFloat3D(wrapper) {
    let animationId;
    let startTime = 0;

    const animate = (currentTime) => {
      if (startTime === 0) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      const floatX = Math.sin(elapsed * 0.001) * 2;
      const floatY = Math.cos(elapsed * 0.0015) * 1.5;
      const rotateZ = Math.sin(elapsed * 0.0008) * 1;
      
      if (wrapper.classList.contains('reveal-active')) {
        wrapper.style.transform += ` translateX(${floatX}px) translateY(${floatY}px) rotateZ(${rotateZ}deg)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    wrapper.addEventListener('mouseenter', () => {
      startTime = 0;
      animationId = requestAnimationFrame(animate);
    });

    wrapper.addEventListener('mouseleave', () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RevealImage();
  new RevealImage3D();
});

// Re-initialize on AJAX page loads (for Shopify themes)
document.addEventListener('shopify:section:load', () => {
  new RevealImage();
  new RevealImage3D();
});