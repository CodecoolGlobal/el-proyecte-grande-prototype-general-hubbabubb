package com.codecool.pantry.repository.ingredient;

import com.codecool.pantry.entity.recipe.ExtendedIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<ExtendedIngredient, Long> {
}
