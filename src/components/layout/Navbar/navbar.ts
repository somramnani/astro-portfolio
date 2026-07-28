  const sectionIds = [
    "home",
    "about",
    "experience",
    "projects",
    "contact",
  ] as const;
  type SectionId = (typeof sectionIds)[number];

  const isSectionId = (sectionId: string): sectionId is SectionId => {
    return sectionIds.includes(sectionId as SectionId);
  };

  const sectionLabels = new Map<SectionId, string>([
    ["home", "Home"],
    ["about", "About"],
    ["experience", "Experience"],
    ["projects", "Projects"],
    ["contact", "Contact"],
  ]);
  const sectionMenu = document.querySelector<HTMLDivElement>("[data-section-menu]");
  const indicator = document.querySelector<HTMLButtonElement>("[data-section-indicator]");
  const indicatorLabel = indicator?.querySelector<HTMLSpanElement>("[data-section-label]");
  const indicatorProgress = indicator?.querySelector<HTMLSpanElement>("[data-section-progress]");
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-section-link]"));
  const mobileSectionLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-mobile-section-link]"));
  const sectionDropdown = document.querySelector<HTMLDivElement>("[data-section-dropdown]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => section !== null);
  let activeSectionId: SectionId | undefined;
  let animationTimer: number | undefined;
  let scrollFrame = 0;

  const setSectionMenuOpen = (isOpen: boolean) => {
    if (!indicator || !sectionDropdown) {
      return;
    }

    indicator.setAttribute("aria-expanded", String(isOpen));
    sectionDropdown.hidden = !isOpen;
    sectionMenu?.classList.toggle("mobile-section-menu-open", isOpen);
  };

  const setActiveSection = (sectionId: SectionId) => {
    if (sectionId === activeSectionId) {
      return;
    }

    activeSectionId = sectionId;
    const nextLabel = sectionLabels.get(sectionId) ?? sectionId;
    const sectionIndex = sectionIds.indexOf(sectionId);

    navLinks.forEach((link) => {
      const isActiveLink = link.hash === `#${sectionId}`;

      link.classList.toggle("nav-link-active", isActiveLink);
      link.toggleAttribute("aria-current", isActiveLink);
    });

    if (indicator && indicatorLabel) {
      indicator.setAttribute("aria-label", `Current section: ${nextLabel}. Open section menu`);
      indicatorLabel.textContent = nextLabel;
    }

    mobileSectionLinks.forEach((link) => {
      const isActiveLink = link.hash === `#${sectionId}`;

      link.classList.toggle("mobile-section-option-active", isActiveLink);
      link.toggleAttribute("aria-current", isActiveLink);
    });

    if (indicatorProgress && sectionIndex >= 0) {
      const progress = ((sectionIndex + 1) / sectionIds.length) * 100;
      indicatorProgress.style.setProperty("--section-progress", `${progress}%`);
    }

    if (indicatorLabel && !prefersReducedMotion) {
      indicatorLabel.classList.remove("mobile-section-label--swap");
      if (animationTimer) {
        window.clearTimeout(animationTimer);
      }
      requestAnimationFrame(() => {
        indicatorLabel.classList.add("mobile-section-label--swap");
        animationTimer = window.setTimeout(() => {
          indicatorLabel.classList.remove("mobile-section-label--swap");
        }, 360);
      });
    }
  };

  const updateActiveSection = () => {
    const triggerLine = Math.min(window.innerHeight * 0.38, 320);
    const currentSection = sections.reduce((current, section) => {
      return section.getBoundingClientRect().top <= triggerLine ? section : current;
    }, sections[0]);

    if (currentSection) {
      if (isSectionId(currentSection.id)) {
        setActiveSection(currentSection.id);
      }
    }
  };

  const queueActiveSectionUpdate = () => {
    if (scrollFrame) {
      return;
    }

    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      updateActiveSection();
    });
  };

  indicator?.addEventListener("click", () => {
    const isOpen = indicator.getAttribute("aria-expanded") === "true";
    setSectionMenuOpen(!isOpen);
  });

  mobileSectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setSectionMenuOpen(false);
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (target instanceof Node && !sectionMenu?.contains(target)) {
      setSectionMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setSectionMenuOpen(false);
      indicator?.focus();
    }
  });

  updateActiveSection();
  window.addEventListener("scroll", queueActiveSectionUpdate, { passive: true });
  window.addEventListener("resize", queueActiveSectionUpdate);
