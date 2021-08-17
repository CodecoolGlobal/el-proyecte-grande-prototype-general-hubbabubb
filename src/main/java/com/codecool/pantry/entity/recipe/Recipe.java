package com.codecool.pantry.entity.recipe;


import com.codecool.pantry.entity.ingredient.Ingredient;
import com.codecool.pantry.entity.listitem.ListItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Recipe {

    @Id
    private Long id;
    private String name;
    private String image;
    private boolean vegetarian;
    private boolean vegan;
    private boolean glutenFree;
    private boolean cheap;
    private boolean dairyFree;
    private int healthScore;
    private String instructions;

    @ManyToMany
    private Set<ListItem> ingredients;

}
