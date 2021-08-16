package com.codecool.pantry.controller;


import lombok.AllArgsConstructor;
import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.repository.recipe.RecipeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@AllArgsConstructor
@RestController
public class RecipeController {

    private final RecipeRepository recipeRepository;

    @PostMapping
    public void createClient(@RequestBody Recipe recipe) {
        recipeRepository.save(recipe);
    }

    // search recipe by name route
    @GetMapping("api/v1/recipe/search/{name}")
    public ResponseEntity<String> searchRecipeByName(@PathVariable(value = "name") String name) {
        final String uri = String.format("https://api.spoonacular.com/recipes/complexSearch?query=%s&number=25&apiKey=8dc3ef2ffcf54e6781629ee83623d725", name);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForEntity(uri, String.class);
    }


    // get recipe by id
    @GetMapping("api/v1/recipe/{id}")
    public ResponseEntity<String> getRecipeById(@PathVariable(value = "id") Long id) {
        final String uri = String.format("https://api.spoonacular.com/recipes/%s/information?apiKey=8dc3ef2ffcf54e6781629ee83623d725", id);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForEntity(uri, String.class);
    }
}
