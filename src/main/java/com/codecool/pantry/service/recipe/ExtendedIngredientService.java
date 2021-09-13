package com.codecool.pantry.service.recipe;

import com.codecool.pantry.entity.recipe.Ingredient;
import com.codecool.pantry.repository.ingredient.IngredientRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ExtendedIngredientService {

    private final IngredientRepository ingredientRepository;


    public void save(Ingredient ingredient) {
        ingredientRepository.save(ingredient);
    }
}
