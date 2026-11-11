
// Port Harcourt Chamber of Commerce
// Responsive Navigation and Footer Information

// Responsive navigation menu
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        const isExpanded =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        mainNav.classList.toggle("open");
    });
}

// Update footer copyright year
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Update last modified date
const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    lastModified.textContent = new Date(
        document.lastModified
    ).toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
