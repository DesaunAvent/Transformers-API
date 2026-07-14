function searchCharacters() {
    const searchBar = document.getElementById("searchBar");

    if (!searchBar) {
        return;
    }

    const input = searchBar.value.toLowerCase();
    const cards = document.getElementsByClassName("character-card");

    for (const card of cards) {
        const heading = card.querySelector("h2");
        const name = heading ? heading.textContent.toLowerCase() : "";

        card.style.display = name.includes(input) ? "block" : "none";
    }
}

async function loadCharacters() {
    const characterContainer =
        document.getElementById("character-container");

    if (!characterContainer) {
        console.error("Could not find #character-container");
        return;
    }

    try {
        const response = await fetch("/api/characters");

        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }

        const characters = await response.json();

        console.log("Characters received:", characters);

        characterContainer.innerHTML = "";

        if (!Array.isArray(characters) || characters.length === 0) {
            characterContainer.innerHTML =
                "<p>No characters were found.</p>";
            return;
        }

        characters.forEach(character => {
            const card = document.createElement("div");
            card.className = "character-card";

            const imagePath =
                character.image || "/images/placeholder.jpg";

            card.innerHTML = `
                <img
                    src="${imagePath}"
                    alt="${character.name || "Transformer"}"
                >

                <h2>${character.name || "Unknown Character"}</h2>

                <p>
                    <strong>Faction:</strong>
                    ${character.faction || "Unknown"}
                </p>

                <p>
                    <strong>Universe:</strong>
                    ${character.universe || "Unknown"}
                </p>

                <p>
                    <strong>Role:</strong>
                    ${character.role || "Unknown"}
                </p>

                <p>${character.description || ""}</p>

                <button
                    type="button"
                    onclick="viewCharacter(${character.characterId})"
                >
                    View Details
                </button>
            `;

            characterContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Character loading error:", error);

        characterContainer.innerHTML =
            "<h2>Unable to load characters.</h2>";
    }
}

function viewCharacter(id) {
    window.location.href = `/details.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", loadCharacters);