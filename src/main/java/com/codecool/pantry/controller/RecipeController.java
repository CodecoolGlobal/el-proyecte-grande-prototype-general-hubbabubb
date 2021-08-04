package com.codecool.pantry.controller;


import com.codecool.pantry.entity.Recipe;
import com.codecool.pantry.repository.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/v1/recipe")
public class RecipeController {

    private final RecipeRepository recipeRepository;

    @PostMapping
    public void createClient(@RequestBody Recipe recipe) {
        recipeRepository.save(recipe);
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable Long id) {
        return recipeRepository.findById(id).orElseThrow(RuntimeException::new);
    }
}
