package com.codecool.pantry.controller.recipe;


import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.service.appuser.AppUserService;
import com.codecool.pantry.service.recipe.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;


@RestController
@RequestMapping(path = "api/v1/recipe")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class RecipeController {

    private final RecipeService recipeService;
    private final AppUserService appUserService;

    // TODO store it in properties!!!!
//    private final String API_KEY3 = "8dc3ef2ffcf54e6781629ee83623d725";
//    private final String API_KEY = "a22052fbcfef4a2fac111f33a93898d8";
    private final String API_KEY = "2b5973da3e1542668e205f85165a8786";
//    private final String API_KEY = "b880826d2c53495f8fb1fa608db88577";

//    private final String API_KEY = "099bdb5cd6ad48e28faab2065fdc4467";


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
    public Optional<Recipe> getAndCacheRecipeById(@PathVariable(value = "id") Long id) {
        Optional<Recipe> recipe = recipeService.get(id);

        if (recipe.isEmpty()) {
            recipe = getRecipeFromSpoonacular(id);
        }

        return recipe;
    }

    private Optional<Recipe> getRecipeFromSpoonacular(Long id) {
        Optional<Recipe> recipe;
        final String uri = String.format("https://api.spoonacular.com/recipes/%s/information?apiKey=%s", id, API_KEY);
        RestTemplate restTemplate = new RestTemplate();

        recipe = Optional.ofNullable(restTemplate.getForObject(uri, Recipe.class));

        recipe.ifPresent(this::saveRecipe);
        return recipe;
    }

    private void saveRecipe(Recipe recipe) {
//        extendedIngredientService.saveAll(recipe.getExtendedExtendedIngredients());
        recipeService.save(recipe);
    }

    @GetMapping("/by-ingredients/{ingredients}") //
    public ResponseEntity<String> searchRecipeByIngredients(@PathVariable("ingredients") String ingredients) {
        final String uri = String.format("https://api.spoonacular.com/recipes/findByIngredients?ingredients=%s&number=20&sort=max-used-ingredients&apiKey=%s",
                ingredients, API_KEY);
        RestTemplate restTemplate = new RestTemplate();
        System.out.println(uri);
        return restTemplate.getForEntity(uri, String.class);
    }

    @PutMapping("{recipeId}/add-to-favorite/{userEmail}")
    public Recipe addToFavorite(@PathVariable Long recipeId, @PathVariable String userEmail) {
        Optional<Recipe> recipe = recipeService.get(recipeId);
        AppUser appUser = appUserService.getUserByEmail(userEmail);

        if (recipe.isEmpty()) {
            throw new IllegalStateException("recipe not found!");
        }

        appUser.addRecipeToFavorite(recipe.get());

        appUserService.save(appUser);

        return recipe.get();
    }

    @PutMapping("{recipeId}/remove-from-favorite/{userEmail}")
    public void  removeFromFavorite(@PathVariable Long recipeId, @PathVariable String userEmail) {
        Optional<Recipe> recipe = recipeService.get(recipeId);
        AppUser appUser = appUserService.getUserByEmail(userEmail);

        if (recipe.isEmpty()) {
            throw new IllegalStateException("recipe not found!");
        }

        appUser.removeFromFavorite(recipe.get());

        appUserService.save(appUser);
    }
}
