package com.example.transformersapi;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {

    List<Character> findByFactionIgnoreCase(String faction);

    List<Character> findByUniverseIgnoreCase(String universe);

    List<Character> findByNameContainingIgnoreCase(String name);
}
