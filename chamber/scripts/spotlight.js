
// Port Harcourt Chamber of Commerce
// Business Member Spotlights

const spotlightContainer = document.querySelector("#spotlight-container");

// Convert membership number into readable text
function getMembershipName(level) {
    if (level === 3) {
        return "Gold Member";
    } else if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}

// Randomly select three businesses
function selectRandomMembers(members) {
    const eligibleMembers = members.filter(
        member => member.membership === 2 || member.membership === 3
    );

    // Shuffle the eligible businesses
    const shuffledMembers = [...eligibleMembers].sort(
        () => Math.random() - 0.5
    );

    return shuffledMembers.slice(0, 3);
}

// Create a business spotlight card
function createSpotlightCard(member) {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    // Business logo
    const logo = document.createElement("img");
    logo.src = `images/${member.image}`;
    logo.alt = `${member.name} logo`;
    logo.loading = "lazy";
    logo.width = 100;
    logo.height = 80;

    // Business name
    const name = document.createElement("h3");
    name.textContent = member.name;

    // Business category
    const category = document.createElement("p");
    category.textContent = member.category;

    // Membership level
    const membership = document.createElement("p");
    membership.textContent = getMembershipName(member.membership);

    // Address
    const address = document.createElement("p");
    address.textContent = `Address: ${member.address}`;

    // Phone number
    const phone = document.createElement("p");
    phone.textContent = `Phone: ${member.phone}`;

    // Website
    const website = document.createElement("a");
    website.href = member.website;
    website.textContent = "Visit Website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    // Add everything to the card
    card.append(
        logo,
        name,
        category,
        membership,
        address,
        phone,
        website
    );

    return card;
}

// Fetch business member data
async function displaySpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load business member data.");
        }

        const members = await response.json();

        const selectedMembers = selectRandomMembers(members);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {
            const card = createSpotlightCard(member);
            spotlightContainer.appendChild(card);
        });

        if (selectedMembers.length === 0) {
            spotlightContainer.textContent =
                "No eligible business members found.";
        }

    } catch (error) {
        console.error("Spotlight error:", error);

        spotlightContainer.textContent =
            "Business spotlights are currently unavailable.";
    }
}

// Run the spotlight function
displaySpotlights();
