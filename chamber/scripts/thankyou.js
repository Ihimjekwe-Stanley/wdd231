
// Display submitted application details from the URL.

const params = new URLSearchParams(window.location.search);

const fields = {
    "submitted-first-name": "firstName",
    "submitted-last-name": "lastName",
    "submitted-email": "email",
    "submitted-phone": "phone",
    "submitted-organization": "organization"
};

Object.entries(fields).forEach(([elementId, parameterName]) => {
    const element = document.getElementById(elementId);
    const value = params.get(parameterName);

    if (element) {
        element.textContent = value || "Not provided";
    }
});

// Display the application timestamp.
const timestampElement = document.getElementById("submitted-timestamp");
const timestampValue = params.get("timestamp");

if (timestampElement) {
    if (timestampValue) {
        const date = new Date(timestampValue);

        timestampElement.textContent = Number.isNaN(date.getTime())
            ? timestampValue
            : date.toLocaleString();
    } else {
        timestampElement.textContent = "Not provided";
    }
}
