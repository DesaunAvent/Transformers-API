package com.example.transformersapi;

import jakarta.persistence.*;
@Entity
@Table(name = "characters")
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long characterId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 1000)
    private String description;
    private String faction;
    private String universe;
    private String role;
    private String image;

    public Character() {
    }

    public Character(String name, String description, String faction, String universe, String role, String Image) {
        this.name = name;
        this.description = description;
        this.faction = faction;
        this.universe = universe;
        this.role = role;
        this.image = image;
    }

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

	public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFaction() {
        return faction;
    }

    public void setFaction(String faction) {
        this.faction = faction;
    }


    public String getUniverse() {
        return universe;
    }

    public void setUniverse(String universe) {
        this.universe = universe;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public String getImage() {
        return image;
    }
}