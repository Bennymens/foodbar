// Masonry Gallery with GSAP Animations
class MasonryGallery {
  constructor(options = {}) {
    this.container = options.container;
    this.items = options.items || [];
    this.ease = options.ease || "power3.out";
    this.duration = options.duration || 0.6;
    this.stagger = options.stagger || 0.05;
    this.animateFrom = options.animateFrom || "bottom";
    this.scaleOnHover = options.scaleOnHover !== false;
    this.hoverScale = options.hoverScale || 0.95;
    this.blurToFocus = options.blurToFocus !== false;
    this.colorShiftOnHover = options.colorShiftOnHover || false;

    this.columns = 3;
    this.hasMounted = false;
    this.grid = [];

    this.init();
  }

  // Get responsive column count
  getColumns() {
    const width = window.innerWidth;
    if (width >= 1500) return 5;
    if (width >= 1000) return 4;
    if (width >= 600) return 3;
    if (width >= 400) return 2;
    return 1;
  }

  // Preload all images
  preloadImages() {
    return Promise.all(
      this.items.map(
        (item) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = item.img;
            img.onload = img.onerror = () => resolve();
          }),
      ),
    );
  }

  // Calculate initial animation position
  getInitialPosition(item, containerRect) {
    let direction = this.animateFrom;

    if (this.animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  }

  // Calculate masonry grid layout
  calculateGrid() {
    const containerWidth = this.container.offsetWidth;
    this.columns = this.getColumns();
    const colHeights = new Array(this.columns).fill(0);
    const columnWidth = containerWidth / this.columns;

    this.grid = this.items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = item.height / 2.2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...item, x, y, w: columnWidth, h: height };
    });

    // Set container height based on tallest column
    const maxHeight = Math.max(...colHeights);
    this.container.style.height = maxHeight + "px";
  }

  // Render grid items
  render() {
    this.container.innerHTML = "";
    this.container.classList.add("masonry-list");

    this.grid.forEach((item, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "masonry-item-wrapper";
      wrapper.dataset.key = item.id;
      wrapper.style.cursor = "pointer";

      const imgDiv = document.createElement("div");
      imgDiv.className = "masonry-item-img";
      imgDiv.style.backgroundImage = `url(${item.img})`;

      if (this.colorShiftOnHover) {
        const overlay = document.createElement("div");
        overlay.className = "color-overlay";
        imgDiv.appendChild(overlay);
      }

      // Add lightbox icon
      const icon = document.createElement("i");
      icon.className = "lnr lnr-picture masonry-icon";
      imgDiv.appendChild(icon);

      wrapper.appendChild(imgDiv);
      this.container.appendChild(wrapper);

      // Add click handler to open lightbox
      wrapper.addEventListener("click", () => {
        this.openLightbox(index);
      });

      // Add hover effects
      wrapper.addEventListener("mouseenter", (e) =>
        this.handleMouseEnter(e, item),
      );
      wrapper.addEventListener("mouseleave", (e) =>
        this.handleMouseLeave(e, item),
      );
    });
  }

  // Animate grid items
  animateGrid() {
    const containerRect = this.container.getBoundingClientRect();

    this.grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!this.hasMounted) {
        const initialPos = this.getInitialPosition(item, containerRect);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
        };

        if (this.blurToFocus) {
          initialState.filter = "blur(10px)";
        }

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(this.blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * this.stagger,
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: this.duration,
          ease: this.ease,
          overwrite: "auto",
        });
      }
    });

    this.hasMounted = true;
  }

  // Handle mouse enter
  handleMouseEnter(e, item) {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (this.scaleOnHover) {
      gsap.to(selector, {
        scale: this.hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (this.colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }

    // Show icon
    const icon = element.querySelector(".masonry-icon");
    if (icon) {
      gsap.to(icon, {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
      });
    }
  }

  // Handle mouse leave
  handleMouseLeave(e, item) {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (this.scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (this.colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }

    // Hide icon
    const icon = element.querySelector(".masonry-icon");
    if (icon) {
      gsap.to(icon, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
      });
    }
  }

  // Initialize gallery
  async init() {
    await this.preloadImages();
    this.calculateGrid();
    this.render();
    this.animateGrid();

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newColumns = this.getColumns();
        if (newColumns !== this.columns) {
          this.calculateGrid();
          this.animateGrid();
        }
      }, 200);
    });
  }

  // Update items and re-render
  updateItems(newItems) {
    this.items = newItems;
    this.calculateGrid();
    this.render();
    this.animateGrid();
  }

  // Open lightbox at specific index
  openLightbox(startIndex) {
    this.currentLightboxIndex = startIndex;
    this.createLightboxOverlay();
    this.showLightboxImage(this.currentLightboxIndex);
  }

  // Create lightbox overlay
  createLightboxOverlay() {
    // Remove existing lightbox if any
    const existing = document.querySelector(".masonry-lightbox");
    if (existing) existing.remove();

    const lightbox = document.createElement("div");
    lightbox.className = "masonry-lightbox";
    lightbox.innerHTML = `
      <div class="lightbox-overlay"></div>
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-prev">&lsaquo;</button>
      <button class="lightbox-next">&rsaquo;</button>
      <div class="lightbox-content">
        <img class="lightbox-image" src="" alt="">
      </div>
      <div class="lightbox-counter"></div>
    `;

    document.body.appendChild(lightbox);

    // Animate in
    gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Event listeners
    lightbox
      .querySelector(".lightbox-close")
      .addEventListener("click", () => this.closeLightbox());
    lightbox
      .querySelector(".lightbox-prev")
      .addEventListener("click", () => this.navigateLightbox(-1));
    lightbox
      .querySelector(".lightbox-next")
      .addEventListener("click", () => this.navigateLightbox(1));
    lightbox
      .querySelector(".lightbox-overlay")
      .addEventListener("click", () => this.closeLightbox());

    // Keyboard navigation
    this.lightboxKeyHandler = (e) => {
      if (e.key === "Escape") this.closeLightbox();
      if (e.key === "ArrowLeft") this.navigateLightbox(-1);
      if (e.key === "ArrowRight") this.navigateLightbox(1);
    };
    document.addEventListener("keydown", this.lightboxKeyHandler);

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  // Show image at index
  showLightboxImage(index) {
    const lightbox = document.querySelector(".masonry-lightbox");
    const img = lightbox.querySelector(".lightbox-image");
    const counter = lightbox.querySelector(".lightbox-counter");

    img.src = this.items[index].img;
    counter.textContent = `${index + 1} / ${this.items.length}`;

    // Animate image
    gsap.fromTo(
      img,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3 },
    );
  }

  // Navigate lightbox
  navigateLightbox(direction) {
    this.currentLightboxIndex += direction;
    if (this.currentLightboxIndex < 0)
      this.currentLightboxIndex = this.items.length - 1;
    if (this.currentLightboxIndex >= this.items.length)
      this.currentLightboxIndex = 0;
    this.showLightboxImage(this.currentLightboxIndex);
  }

  // Close lightbox
  closeLightbox() {
    const lightbox = document.querySelector(".masonry-lightbox");
    if (!lightbox) return;

    gsap.to(lightbox, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        lightbox.remove();
        document.body.style.overflow = "";
        document.removeEventListener("keydown", this.lightboxKeyHandler);
      },
    });
  }
}

// Make it globally available
window.MasonryGallery = MasonryGallery;
