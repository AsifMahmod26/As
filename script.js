// Edit this array to update project names, links, colors, or icons in one place.
const projects = [
  { name: "Image Background Remover", color: "#08a85d", tint: "#dff8eb", icon: "image", projectUrl: "https://play.google.com/store/apps/details?id=com.imagebackgroundremover&pcampaignid=web_share", playStoreUrl: "https://play.google.com/store/apps/details?id=com.imagebackgroundremover&pcampaignid=web_share" },
  { name: "Video Converter", color: "#276af2", tint: "#e5efff", icon: "video", projectUrl: "https://play.google.com/store/apps/details?id=com.anyvideoconverter&pcampaignid=web_share", playStoreUrl: "https://play.google.com/store/apps/details?id=com.anyvideoconverter&pcampaignid=web_share" },
  { name: "Things Counter", color: "#ff8a25", tint: "#fff0df", icon: "counter", projectUrl: "https://play.google.com/store/apps/details?id=com.thingscounter&pcampaignid=web_share", playStoreUrl: "https://play.google.com/store/apps/details?id=com.thingscounter&pcampaignid=web_share" },
  { name: "MP3 Trimmer", color: "#9257e8", tint: "#f1e9ff", icon: "audio", projectUrl: "https://play.google.com/store/apps/details?id=com.mp3trimmer&pcampaignid=web_share", playStoreUrl: "https://play.google.com/store/apps/details?id=com.mp3trimmer&pcampaignid=web_share" },
  { name: "MP4 Trimmer", color: "#ec4b65", tint: "#ffe8ec", icon: "trim", projectUrl: "https://play.google.com/store/apps/details?id=com.mp4trimmer&pcampaignid=web_share", playStoreUrl: "https://play.google.com/store/apps/details?id=com.mp4trimmer&pcampaignid=web_share" },
  { name: "Image Resizer", color: "#00a5b7", tint: "#def7fa", icon: "resize", projectUrl: "https://play.google.com/store/apps/details?id=com.imageresize&pcampaignid=web_share", playStoreUrl: "https://play.google.com/store/apps/details?id=com.imageresize&pcampaignid=web_share" }
];

const icons = {
  image: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="5" width="24" height="22" rx="4"/><circle cx="12" cy="12" r="2"/><path d="m7 23 6-6 4 4 3-3 5 5"/></svg>',
  video: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="7" width="18" height="18" rx="4"/><path d="m22 13 6-3v12l-6-3z"/><path d="m9 16 3 3 5-6"/></svg>',
  counter: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 9h14M9 16h14M9 23h14"/><circle cx="5" cy="9" r="1"/><circle cx="5" cy="16" r="1"/><circle cx="5" cy="23" r="1"/></svg>',
  audio: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M13 22V8l12-3v14"/><circle cx="9" cy="23" r="4"/><circle cx="21" cy="20" r="4"/></svg>',
  trim: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 5v16a5 5 0 0 0 5 5h13M5 9h16a5 5 0 0 1 5 5v13"/><path d="m5 5 22 22"/></svg>',
  resize: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 5H5v7M20 27h7v-7M5 12l8-8M27 20l-8 8M20 5h7v7M12 27H5v-7"/></svg>'
};

const projectGrid = document.querySelector("#project-grid");
if (projectGrid) {
  projectGrid.innerHTML = projects.map(function (project) {
    const placeholder = project.projectUrl === "#" ? ' data-placeholder-link title="Project link coming soon"' : "";
    return '<article class="project-card reveal" style="--card-color:' + project.color + ';--card-tint:' + project.tint + '">' +
      '<div class="project-icon">' + icons[project.icon] + '</div>' +
      '<h3>' + project.name + '</h3>' +
      '<div class="project-links">' +
      '<a class="project-link" href="' + project.projectUrl + '"' + placeholder + '>View Project <span aria-hidden="true">→</span></a>' +
      '<a class="play-link" href="' + project.playStoreUrl + '" target="_blank" rel="noopener noreferrer"><span class="play-mark" aria-hidden="true"></span>Play Store</a>' +
      '</div></article>';
  }).join("");
}

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".primary-nav");
if (menuButton && menu) {
  const closeMenu = function () {
    menu.classList.remove("open");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };
  menuButton.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    menuButton.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  menu.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeMenu(); });
  document.addEventListener("click", function (event) { if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
}

document.querySelectorAll("[data-placeholder-link]").forEach(function (link) {
  link.addEventListener("click", function (event) { event.preventDefault(); });
});

const observer = "IntersectionObserver" in window ? new IntersectionObserver(function (entries, revealObserver) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 }) : null;

document.querySelectorAll(".reveal").forEach(function (element, index) {
  element.style.transitionDelay = String(Math.min(index % 4, 3) * 70) + "ms";
  if (observer) observer.observe(element); else element.classList.add("visible");
});
