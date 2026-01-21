/**
 * Simple SPA Router for Longdon Foods
 * Handles client-side navigation without page reloads
 */
(function () {
  "use strict";

  const Router = {
    routes: {
      "/": "index.html",
      "/home": "index.html",
      "/about": "about-us.html",
      "/menu": "menu.html",
      "/gallery": "gallery.html",
      "/blog": "blog.html",
      "/contact": "contact.html",
      "/book-table": "book-table.html",
      "/elements": "elements.html",
    },

    init: function () {
      // Handle browser back/forward
      window.addEventListener("popstate", () => this.handleRoute());

      // Intercept link clicks
      document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (link && link.href && link.origin === window.location.origin) {
          const path = link.pathname;

          // Skip if it's a hash link or external
          if (link.hash || link.target === "_blank") return;

          e.preventDefault();
          this.navigate(path);
        }
      });

      // Handle initial load
      this.handleRoute();
    },

    navigate: function (path) {
      // Normalize path
      path = path.replace(".html", "");
      if (path === "" || path === "/index") path = "/";

      window.history.pushState({}, "", path);
      this.handleRoute();
    },

    handleRoute: function () {
      let path = window.location.pathname;

      // Normalize path
      path = path.replace(".html", "");
      if (path === "" || path === "/index") path = "/";

      const page = this.routes[path] || this.routes["/"];

      // Scroll to top on route change
      window.scrollTo(0, 0);

      // Optional: Add page transition or loading indicator here
      // For now, we'll just let the static pages work as they are
    },

    updateActiveNav: function (path) {
      // Remove all active classes
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Add active class to current page
      const activeLink = document.querySelector(`a[href="${path}"]`);
      if (activeLink) {
        const navItem = activeLink.closest(".nav-item");
        if (navItem) navItem.classList.add("active");
      }
    },
  };

  // Initialize router when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => Router.init());
  } else {
    Router.init();
  }
})();
