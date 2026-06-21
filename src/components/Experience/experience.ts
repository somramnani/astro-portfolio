const experienceSection = document.querySelector<HTMLElement>(
  "[data-experience-section]",
);
const experienceEntries = Array.from(
  document.querySelectorAll<HTMLElement>("[data-experience-entry]"),
);
const prefersReducedExperienceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (
  experienceSection &&
  experienceEntries.length > 0 &&
  !prefersReducedExperienceMotion
) {
  experienceSection.classList.add("experience-animate-ready");

  const sectionObserver = new IntersectionObserver(
    ([entry]) => {
      experienceSection.classList.toggle(
        "experience-timeline-visible",
        entry.isIntersecting,
      );
    },
    { threshold: 0.18 },
  );

  const entryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("experience-entry-visible");
          entryObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -16% 0px",
      threshold: 0.24,
    },
  );

  sectionObserver.observe(experienceSection);
  experienceEntries.forEach((entry) => entryObserver.observe(entry));
}
