package com.codecool.pantry.controller.recipe;

import lombok.AllArgsConstructor;
import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.repository.recipe.RecipeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;



@RestController
@AllArgsConstructor
public class RecipeController {
    private final RecipeRepository recipeRepository;

    private final String API_KEY = "8dc3ef2ffcf54e6781629ee83623d725";  // TODO store it in properties!!!!

    @PostMapping
    public void saveRecipe(@RequestBody Recipe recipe) {
        recipeRepository.save(recipe);
    }


    @GetMapping( path = "api/v1/recipe/search-fixed/pizza")
    public ResponseEntity<String> searckkhRecipeByName() {
        final String uri = String.format("https://api.spoonacular.com/recipes/complexSearch?query=pizza&number=25&apiKey=%s",
                 API_KEY);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForEntity(uri, String.class);
    }


    @GetMapping( path = "api/v1/recipe/search/{name}")
    public ResponseEntity<String> searchRecipeByName(@PathVariable(value = "name") String name) {
        final String uri = String.format("https://api.spoonacular.com/recipes/complexSearch?query=%s&number=25&apiKey=%s",
                name, API_KEY);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForEntity(uri, String.class);
    }

    @GetMapping("api/v1/recipe/{id}")
    public Optional<Recipe> getRecipeById(@PathVariable(value = "id") Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);

        if (recipe.isEmpty()) {
            final String uri = String.format("https://api.spoonacular.com/recipes/%s/information?apiKey=%s", id, API_KEY);
            RestTemplate restTemplate = new RestTemplate();

            recipe = Optional.of(restTemplate.getForObject(uri, Recipe.class));

            recipeRepository.save(recipe.get());
        }

        return recipe;
    }


    @GetMapping("api/v1/recipe/by-ingredients/{ingredients}")
    public ResponseEntity<String> searchRecipeByIngredients(@PathVariable("ingredients") List<String> ingredients) {
        final String uri = String.format("https://api.spoonacular.com/recipes/findByIngredients?ingredients=%s&number=5&apiKey=%s",
                generateIngredientQuery(ingredients), API_KEY);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForEntity(uri, String.class);
    }

    public String generateIngredientQuery(List<String> ingredients) {
        if (ingredients.size() < 1) {
            return "throw-error"; // exception + handling
        }

        StringBuilder searchQuery = new StringBuilder(ingredients.get(0));
        for (int i = 1; i < ingredients.size(); i++) {
            searchQuery.append(",+");
            searchQuery.append(ingredients.get(i));
        }
        return searchQuery.toString();

    }


}
