package com.codecool.pantry.entity.recipe;

import com.codecool.pantry.entity.listitem.ListItem;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class Recipe {

    @Id
    private Long id;
    private String title;
    private String image;
    private boolean vegetarian;
    private boolean vegan;
    private boolean glutenFree;
    private boolean cheap;
    private boolean dairyFree;
    private int healthScore;
    private String instructions;

    // @ManyToMany
    // private Set<ListItem> ingredients;

    public Recipe(Long id, String title, String image, boolean vegetarian, boolean vegan, boolean glutenFree, boolean cheap, boolean dairyFree, int healthScore, String instructions) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
        this.glutenFree = glutenFree;
        this.cheap = cheap;
        this.dairyFree = dairyFree;
        this.healthScore = healthScore;
        this.instructions = instructions;
    }
}
