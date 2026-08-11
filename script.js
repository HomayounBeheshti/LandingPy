document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const siteToast = document.getElementById("siteToast");

  const profileToggle = document.getElementById("profileToggle");
  const profileDropdown = document.getElementById("profileDropdown");

  const categoryList = document.getElementById("categoryList");
  const categoryNext = document.getElementById("categoryNext");
  const categoryPrev = document.getElementById("categoryPrev");
  const categoryPills = document.querySelectorAll(".category-pill");

  const heroSlider = document.getElementById("heroSlider");
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDots = document.querySelectorAll(".hero-dot");
  const heroPrev = document.getElementById("heroPrev");
  const heroNext = document.getElementById("heroNext");

  const showToast = (message) => {
    if (!siteToast) return;

    siteToast.textContent = message;
    siteToast.classList.add("show");

    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      siteToast.classList.remove("show");
    }, 2200);
  };

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const query = searchInput.value.trim();

      if (!query) {
        showToast("برای جستجو یک عبارت وارد کن");
        searchInput.focus();
        return;
      }

      showToast(`جستجو برای «${query}»`);
    });
  }

  if (profileToggle && profileDropdown) {
    profileToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = profileToggle.getAttribute("aria-expanded") === "true";

      profileToggle.setAttribute("aria-expanded", String(!isOpen));
      profileDropdown.setAttribute("aria-hidden", String(isOpen));
      profileDropdown.classList.toggle("show", !isOpen);
    });

    document.addEventListener("click", (event) => {
      if (
        !profileDropdown.contains(event.target) &&
        !profileToggle.contains(event.target)
      ) {
        profileToggle.setAttribute("aria-expanded", "false");
        profileDropdown.setAttribute("aria-hidden", "true");
        profileDropdown.classList.remove("show");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        profileToggle.setAttribute("aria-expanded", "false");
        profileDropdown.setAttribute("aria-hidden", "true");
        profileDropdown.classList.remove("show");
      }
    });
  }

  if (categoryPills.length) {
    categoryPills.forEach((pill) => {
      pill.addEventListener("click", (event) => {
        event.preventDefault();

        categoryPills.forEach((item) => {
          item.classList.remove("active");
          item.removeAttribute("aria-current");
        });

        pill.classList.add("active");
        pill.setAttribute("aria-current", "true");

        const selectedCategory = pill.dataset.category;
        const selectedText = pill.textContent.trim();

        if (selectedCategory) {
          showToast(`نمایش دسته «${selectedText}»`);
        }
      });
    });
  }

  if (categoryList && categoryNext && categoryPrev) {
    categoryNext.addEventListener("click", () => {
      categoryList.scrollBy({
        left: -260,
        behavior: "smooth",
      });
    });

    categoryPrev.addEventListener("click", () => {
      categoryList.scrollBy({
        left: 260,
        behavior: "smooth",
      });
    });
  }

  if (heroSlider && heroSlides.length) {
    let currentSlide = 0;

    const showSlide = (index) => {
      currentSlide = (index + heroSlides.length) % heroSlides.length;

      heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === currentSlide);
      });

      heroDots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentSlide;

        dot.classList.toggle("active", isActive);

        if (isActive) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    if (heroDots.length) {
      heroDots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const slideTo = Number(dot.dataset.slideTo);

          if (!Number.isNaN(slideTo)) {
            showSlide(slideTo);
          }
        });
      });
    }

    if (heroPrev) {
      heroPrev.addEventListener("click", () => {
        showSlide(currentSlide - 1);
      });
    }

    if (heroNext) {
      heroNext.addEventListener("click", () => {
        showSlide(currentSlide + 1);
      });
    }

    showSlide(currentSlide);
  }
});
