package com.codecool.pantry.repository.recipe;

import com.codecool.pantry.entity.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
