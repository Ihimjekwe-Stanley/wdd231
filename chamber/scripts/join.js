
// Join page JavaScript

// Add the current date and time to the application form.
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

// Open the membership benefits when a button is clicked.
const membershipButtons = document.querySelectorAll(".modal-button");

membershipButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});

// Close the membership benefits dialog.
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});
