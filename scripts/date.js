
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// Display the current year in the footer.
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Show when the page was last updated.
if (lastModified) {
    const modifiedDate = new Date(document.lastModified);

    lastModified.textContent = modifiedDate.toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}
