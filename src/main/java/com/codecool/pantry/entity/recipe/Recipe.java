package com.codecool.pantry.entity.recipe;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Recipe {

    @Id
    @Column(name = "id", unique=true, nullable = false)
    private Long id;
    private String title;
    private String image;
    private boolean vegetarian;
    private boolean vegan;
    private boolean glutenFree;
    private boolean cheap;
    private boolean dairyFree;
    private int healthScore;

    @Column(length = 2000)
    private String instructions;

    @Column(length = 2000)
    private String summary;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "recipe")
    private Set<Ingredient> extendedIngredients;
}
