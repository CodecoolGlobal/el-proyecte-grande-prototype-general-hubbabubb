package com.codecool.pantry.controller.recipe;


import com.codecool.pantry.entity.recipe.Ingredient;
import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.repository.ingredient.IngredientRepository;
import com.codecool.pantry.repository.recipe.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;


@RestController
@RequestMapping(path = "api/v1/recipe")
@AllArgsConstructor
public class RecipeController {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

//    private final String API_KEY3 = "8dc3ef2ffcf54e6781629ee83623d725";  // TODO store it in properties!!!!
//    private final String API_KEY = "a22052fbcfef4a2fac111f33a93898d8";
//    private final String API_KEY = "2b5973da3e1542668e205f85165a8786";
//    private final String API_KEY = "b880826d2c53495f8fb1fa608db88577";

    private final String API_KEY = "099bdb5cd6ad48e28faab2065fdc4467";


//    @PostMapping
//    public void saveRecipe(@RequestBody Recipe_old recipe) {
//        recipeRepository.save(recipe);
//    }
//

    @GetMapping(path = "/search/{name}")
    public ResponseEntity<String> searchRecipeByName(@PathVariable(value = "name") String name) {
        final String uri = String.format("https://api.spoonacular.com/recipes/complexSearch?query=%s&number=25&apiKey=%s",
                name, API_KEY);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.getForEntity(uri, String.class);
    }


    @GetMapping("/{id}")
    public Optional<Recipe> getRecipeById(@PathVariable(value = "id") Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);

        if (recipe.isEmpty()) {
            final String uri = String.format("https://api.spoonacular.com/recipes/%s/information?apiKey=%s", id, API_KEY);
            RestTemplate restTemplate = new RestTemplate();

            recipe = Optional.ofNullable(restTemplate.getForObject(uri, Recipe.class));

            if (recipe.isPresent()) {
                for (Ingredient ingredient : recipe.get().getExtendedIngredients()) {
                    ingredientRepository.save(ingredient);
                }
                recipeRepository.save(recipe.get());
            }
        }

        return recipe;
    }

    @GetMapping("/by-ingredients/{ingredients}") //
    public ResponseEntity<String> searchRecipeByIngredients(@PathVariable("ingredients") String ingredients) {
        final String uri = String.format("https://api.spoonacular.com/recipes/findByIngredients?ingredients=%s&number=20&sort=max-used-ingredients&apiKey=%s",
                ingredients, API_KEY);
        RestTemplate restTemplate = new RestTemplate();
        System.out.println(uri);
        return restTemplate.getForEntity(uri, String.class);
    }
}
//      THIS ALREADY DONE BY THE FRONT-END
//    public String generateIngredientQuery(List<String> ingredients) {
//        if (ingredients.size() < 1) {
//            return "throw-error"; // exception + handling
//        }
//
//        StringBuilder searchQuery = new StringBuilder(ingredients.get(0));
//        for (int i = 1; i < ingredients.size(); i++) {
//            searchQuery.append(",+");
//            searchQuery.append(ingredients.get(i));
//        }
//        return searchQuery.toString();
//
//    }
