/**
 * Video Banner JavaScript
 * Handles 5-second 3D video banner functionality with custom controls
 */

class VideoBanner {
  constructor() {
    this.bannerSections = document.querySelectorAll('.video-banner-section');
    this.init();
  }

  init() {
    this.bannerSections.forEach(section => this.setupBannerSection(section));
  }

  setupBannerSection(section) {
    const wrapper = section.querySelector('.video-banner-wrapper');
    const video = section.querySelector('.video-banner-element');
    const controls = section.querySelector('.video-banner-controls');
    
    if (!wrapper || !video) return;

    const autoplay = section.dataset.autoplay === 'true';
    const loop = section.dataset.loop === 'true';
    const duration = parseInt(section.dataset.duration) || 5;

    this.setupVideoProperties(video, autoplay, loop, duration);
    this.setupCustomControls(wrapper, video, controls);
    this.enforce3DVideoEffects(wrapper, video);
    this.enforceVideoDuration(video, duration);
  }

  setupVideoProperties(video, autoplay, loop, duration) {
    // Set video properties
    video.autoplay = autoplay;
    video.loop = loop;
    video.muted = true; // Required for autoplay
    video.playsInline = true;

    // Add event listeners
    video.addEventListener('loadeddata', () => {
      console.log(`Video loaded: ${video.duration}s duration (max: ${duration}s)`);
    });

    video.addEventListener('play', () => {
      video.closest('.video-banner-wrapper').classList.add('playing');
    });

    video.addEventListener('pause', () => {
      video.closest('.video-banner-wrapper').classList.remove('playing');
    });

    // Handle autoplay with 3D effect
    if (autoplay) {
      video.addEventListener('play', () => {
        video.closest('.video-banner-wrapper').classList.add('autoplay-3d');
      });
    }
  }

  setupCustomControls(wrapper, video, controls) {
    if (!controls) return;

    const playPauseBtn = controls.querySelector('.video-play-pause');
    const muteBtn = controls.querySelector('.video-mute');
    const fullscreenBtn = controls.querySelector('.video-fullscreen');
    const progressBar = controls.querySelector('.video-progress-bar');
    const progressFill = controls.querySelector('.video-progress-fill');

    // Play/Pause button
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    }

    // Mute button
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        wrapper.classList.toggle('muted', video.muted);
      });
    }

    // Fullscreen button
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      });
    }

    // Progress bar
    if (progressBar && progressFill) {
      video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressFill.style.width = `${progress}%`;
      });

      progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        video.currentTime = percentage * video.duration;
      });
    }
  }

  enforce3DVideoEffects(wrapper, video) {
    // Add sophisticated 3D transformations
    let animationFrame;
    let startTime = 0;

    const animate3D = (currentTime) => {
      if (startTime === 0) startTime = currentTime;
      const elapsed = currentTime - startTime;

      // Create subtle 3D floating effect
      const floatY = Math.sin(elapsed * 0.0005) * 3;
      const rotateX = Math.sin(elapsed * 0.0003) * 0.5;
      const rotateY = Math.cos(elapsed * 0.0004) * 0.8;
      const scale = 1 + Math.sin(elapsed * 0.0002) * 0.01;

      if (wrapper.classList.contains('autoplay-3d')) {
        wrapper.style.transform = `
          perspective(1000px) 
          translateY(${floatY}px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale(${scale})
        `;
      }

      animationFrame = requestAnimationFrame(animate3D);
    };

    // Start animation when video plays
    video.addEventListener('play', () => {
      if (video.autoplay) {
        startTime = 0;
        animationFrame = requestAnimationFrame(animate3D);
      }
    });

    // Stop animation when video pauses
    video.addEventListener('pause', () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        wrapper.style.transform = '';
      }
    });

    // Enhanced hover effects
    wrapper.addEventListener('mouseenter', () => {
      if (!wrapper.classList.contains('autoplay-3d')) {
        wrapper.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      if (!wrapper.classList.contains('autoplay-3d')) {
        wrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
    });
  }

  enforceVideoDuration(video, maxDuration) {
    video.addEventListener('loadedmetadata', () => {
      if (video.duration > maxDuration) {
        console.warn(`Video duration (${video.duration}s) exceeds maximum (${maxDuration}s)`);
      }
    });

    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= maxDuration) {
        if (video.loop) {
          video.currentTime = 0;
        } else {
          video.pause();
        }
      }
    });
  }
}

// Advanced 3D Video Effects
class VideoBanner3D {
  constructor() {
    this.setup3DEnvironment();
    this.setupInteractiveEffects();
  }

  setup3DEnvironment() {
    const wrappers = document.querySelectorAll('.video-banner-wrapper');
    
    wrappers.forEach(wrapper => {
      this.addParallax3D(wrapper);
      this.addDepthShadows(wrapper);
    });
  }

  addParallax3D(wrapper) {
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      const rotateX = deltaY * -8;
      const rotateY = deltaX * 8;
      const translateZ = Math.abs(deltaX) + Math.abs(deltaY) * 10;
      
      wrapper.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(${translateZ}px)
        scale(${1 + (translateZ * 0.001)})
      `;
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    });
  }

  addDepthShadows(wrapper) {
    const originalBoxShadow = getComputedStyle(wrapper).boxShadow;
    
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      const shadowX = deltaX * -20;
      const shadowY = deltaY * -20;
      const shadowBlur = 40 + Math.abs(deltaX + deltaY) * 20;
      
      wrapper.style.boxShadow = `
        ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3),
        0 20px 60px rgba(0, 0, 0, 0.2)
      `;
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.style.boxShadow = originalBoxShadow;
    });
  }

  setupInteractiveEffects() {
    const videos = document.querySelectorAll('.video-banner-element');
    
    videos.forEach(video => {
      this.addVideoDistortion(video);
    });
  }

  addVideoDistortion(video) {
    // Add subtle video effects during playback
    video.addEventListener('play', () => {
      let frame = 0;
      const animate = () => {
        if (!video.paused) {
          frame++;
          const intensity = Math.sin(frame * 0.02) * 0.02;
          video.style.filter = `
            hue-rotate(${intensity * 10}deg) 
            saturate(${1 + intensity}) 
            brightness(${1 + intensity * 0.1})
          `;
          requestAnimationFrame(animate);
        } else {
          video.style.filter = '';
        }
      };
      animate();
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new VideoBanner();
  new VideoBanner3D();
});

// Re-initialize on AJAX page loads (for Shopify themes)
document.addEventListener('shopify:section:load', () => {
  new VideoBanner();
  new VideoBanner3D();
});

// Handle video load errors gracefully
document.addEventListener('error', (e) => {
  if (e.target.tagName === 'VIDEO') {
    console.error('Video failed to load:', e.target.src);
    const wrapper = e.target.closest('.video-banner-wrapper');
    if (wrapper) {
      wrapper.innerHTML = `
        <div class="video-error-message">
          <p>Unable to load video. Please check the video URL and try again.</p>
        </div>
      `;
    }
  }
}, true);