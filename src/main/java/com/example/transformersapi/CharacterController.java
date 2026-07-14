package com.example.transformersapi;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/characters")
@CrossOrigin(origins = "*")
public class CharacterController {

    private final CharacterService characterService;

    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }

    @GetMapping
    public List<Character> getAllCharacters() {
        return characterService.getAllCharacters();
    }

    @GetMapping("characters/{id}")
    public ResponseEntity<Character> getCharacterById(@PathVariable Long id) {
        Character character = characterService.getCharacterById(id);

        if (character == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(character);
    }

    @PostMapping("/api/characters")
public ResponseEntity<Character> createCharacter(
        @RequestBody Character character
) {
    Character savedCharacter =
            characterService.createCharacter(character);

    return ResponseEntity.ok(savedCharacter);
}

    @PutMapping("characters/{id}")
    public ResponseEntity<Character> updateCharacter(
            @PathVariable Long id,
            @RequestBody Character updatedCharacter
    ) {
        Character character = characterService.updateCharacter(id, updatedCharacter);

        if (character == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(character);
    }
    

    @DeleteMapping("characters/{id}")
    public ResponseEntity<Void> deleteCharacter(@PathVariable Long id) {
        boolean deleted = characterService.deleteCharacter(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("characters/faction/{faction}")
    public List<Character> getCharactersByFaction(@PathVariable String faction) {
        return characterService.getCharactersByFaction(faction);
    }

    @GetMapping("characters/universe/{universe}")
    public List<Character> getCharactersByUniverse(@PathVariable String universe) {
        return characterService.getCharactersByUniverse(universe);
    }

    @GetMapping("characters/search")
    public List<Character> searchCharactersByName(@RequestParam String name) {
        return characterService.searchCharactersByName(name);
    }
}
