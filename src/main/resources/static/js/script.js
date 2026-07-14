function searchCharacters() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let card of cards) {
        let name = card.querySelector("h2").textContent.toLowerCase();

        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
}
const characterContainer = document.getElementById("character-container");

async function loadCharacters() {
    const response = await fetch("/characters");
    const characters = await response.json();

    characters.forEach(character => {
        console.log(character);
    });
}

loadCharacters();