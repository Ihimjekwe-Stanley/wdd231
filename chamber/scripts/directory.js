
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

// Display membership level as a readable label
function getMembershipName(level) {
    if (level === 3) return "Gold Member";
    if (level === 2) return "Silver Member";
    return "Member";
}

// Create and display one business card
function createMemberCard(member) {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.loading = "lazy";
    image.width = 150;
    image.height = 100;

    const name = document.createElement("h3");
    name.textContent = member.name;

    const category = document.createElement("p");
    category.textContent = member.category;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const membership = document.createElement("p");
    membership.textContent = getMembershipName(member.membership);

    const website = document.createElement("a");
    website.href = member.website;
    website.textContent = "Visit Website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    card.append(image, name, category, address, phone, membership, website);

    return card;
}

// Fetch business information from the JSON file
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member information.");
        }

        const members = await response.json();

        membersContainer.innerHTML = "";

        members.forEach((member) => {
            membersContainer.appendChild(createMemberCard(member));
        });

    } catch (error) {
        console.error("Error loading members:", error);
        membersContainer.textContent =
            "Sorry, the business directory could not be loaded. Please try again later.";
    }
}

// Switch to grid view
gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-list");
    membersContainer.classList.add("members-grid");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

// Switch to list view
listButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-grid");
    membersContainer.classList.add("members-list");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

// Responsive navigation menu
menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    mainNav.classList.toggle("open");
});

// Update footer information
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;

// Load the business directory
getMembers();
