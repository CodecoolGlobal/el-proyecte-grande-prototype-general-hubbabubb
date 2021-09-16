package com.codecool.pantry.entity.recipe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDto {
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

    private String summary;

    private List<ExtendedIngredientDto> extendedIngredients = new ArrayList<>();
}
