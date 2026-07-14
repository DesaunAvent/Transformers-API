document.addEventListener("DOMContentLoaded", loadCharacterDetails);

async function loadCharacterDetails() {
    const container = document.getElementById("details-container");
    const parameters = new URLSearchParams(window.location.search);
    const id = parameters.get("id");

    if (!id) {
        container.innerHTML = "<p>No character ID was provided.</p>";
        return;
    }

    try {
        const response = await fetch(`/characters/${id}`);

        if (!response.ok) {
            throw new Error("Character could not be found.");
        }

        const character = await response.json();

        container.innerHTML = `
            <div class="character-details">
                <img src="${character.image}" alt="${character.name}">

                <h1>${character.name}</h1>

                <p><strong>Faction:</strong> ${character.faction}</p>
                <p><strong>Universe:</strong> ${character.universe}</p>
                <p><strong>Role:</strong> ${character.role}</p>
                <p>${character.description}</p>

                <a href="/update.html?id=${character.characterId}">
                    Update Character
                </a>

                <button id="delete-button">
                    Delete Character
                </button>
            </div>
        `;

        document
            .getElementById("delete-button")
            .addEventListener("click", () => deleteCharacter(id));

    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Unable to load character.</p>";
    }
}

async function deleteCharacter(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this character?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/characters/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Character could not be deleted.");
        }

        window.location.href = "/index.html";
    } catch (error) {
        console.error(error);
        alert("Unable to delete character.");
    }
}