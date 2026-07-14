document.addEventListener("DOMContentLoaded", prepareUpdateForm);

async function prepareUpdateForm() {
    const parameters = new URLSearchParams(window.location.search);
    const id = parameters.get("id");
    const form = document.getElementById("update-form");

    if (!id) {
        alert("No character ID was provided.");
        return;
    }

    try {
        const response = await fetch(`/characters/${id}`);

        if (!response.ok) {
            throw new Error("Character could not be loaded.");
        }

        const character = await response.json();

        document.getElementById("name").value = character.name;
        document.getElementById("description").value =
            character.description;
        document.getElementById("faction").value =
            character.faction || "";
        document.getElementById("universe").value =
            character.universe || "";
        document.getElementById("role").value =
            character.role || "";
        document.getElementById("image").value =
            character.image || "";

        form.addEventListener("submit", event => {
            updateCharacter(event, id);
        });

    } catch (error) {
        console.error(error);
        alert("Unable to load character.");
    }
}

async function updateCharacter(event, id) {
    event.preventDefault();

    const character = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        faction: document.getElementById("faction").value,
        universe: document.getElementById("universe").value,
        role: document.getElementById("role").value,
        image: document.getElementById("image").value
    };

    try {
        const response = await fetch(`/characters/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(character)
        });

        if (!response.ok) {
            throw new Error("Character could not be updated.");
        }

        window.location.href = `/details.html?id=${id}`;
    } catch (error) {
        console.error(error);
        alert("Unable to update character.");
    }
}