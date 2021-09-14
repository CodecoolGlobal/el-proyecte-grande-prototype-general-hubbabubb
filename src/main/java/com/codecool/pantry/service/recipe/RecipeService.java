package com.codecool.pantry.service.recipe;

import com.codecool.pantry.entity.recipe.ExtendedIngredient;
import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.repository.recipe.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public Optional<Recipe> get(Long id) {
        return recipeRepository.findById(id);
    }

    public void save(Recipe recipe) {
        recipeRepository.save(recipe);
    }
}
