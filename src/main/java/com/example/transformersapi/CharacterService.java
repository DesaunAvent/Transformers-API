package com.example.transformersapi;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;

    public CharacterService(CharacterRepository characterRepository) {
        this.characterRepository = characterRepository;
    }

    public List<Character> getAllCharacters() {
        return characterRepository.findAll();
    }

    public Character getCharacterById(Long id) {
        return characterRepository.findById(id).orElse(null);
    }

    public Character addCharacter(Character character) {
        return characterRepository.save(character);
    }

    public Character updateCharacter(Long id, Character updatedCharacter) {
        Character existingCharacter = characterRepository.findById(id).orElse(null);

        if (existingCharacter == null) {
            return null;
        }

        existingCharacter.setName(updatedCharacter.getName());
        existingCharacter.setDescription(updatedCharacter.getDescription());
        existingCharacter.setFaction(updatedCharacter.getFaction());
        existingCharacter.setUniverse(updatedCharacter.getUniverse());
        existingCharacter.setRole(updatedCharacter.getRole());

        return characterRepository.save(existingCharacter);
    }

    public boolean deleteCharacter(Long id) {
        if (!characterRepository.existsById(id)) {
            return false;
        }

        characterRepository.deleteById(id);
        return true;
    }

    public List<Character> getCharactersByFaction(String faction) {
        return characterRepository.findByFactionIgnoreCase(faction);
    }

    public List<Character> getCharactersByUniverse(String universe) {
        return characterRepository.findByUniverseIgnoreCase(universe);
    }

    public List<Character> searchCharactersByName(String name) {
        return characterRepository.findByNameContainingIgnoreCase(name);
    }
}