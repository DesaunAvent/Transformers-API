document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("character-form");

    form.addEventListener("submit", createCharacter);
});

async function createCharacter(event) {
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
        const response = await fetch("/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(character)
        });

        if (!response.ok) {
            throw new Error("Character could not be created.");
        }

        window.location.href = "/index.html";
    } catch (error) {
        console.error(error);
        alert("Unable to create character.");
    }
}