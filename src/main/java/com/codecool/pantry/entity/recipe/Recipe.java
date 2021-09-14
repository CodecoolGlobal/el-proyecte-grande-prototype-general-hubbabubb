package com.codecool.pantry.entity.recipe;


import com.codecool.pantry.entity.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "extended_ingredients",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "extended_Ingredient_id")
    )
    private List<ExtendedIngredient> extendedIngredients = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "favorites")
    private Set<AppUser> appUsers = new HashSet<>();
}
