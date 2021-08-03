package com.codecool.pantry.contoller.recipe;


import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.repository.appuser.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/recipe")
public class RecipeController {

    private final RecipeRepository recipeRepository;

    @GetMapping
    public String getRecipe(@RequestBody Recipe recipe) {
        return null;
    }
}
