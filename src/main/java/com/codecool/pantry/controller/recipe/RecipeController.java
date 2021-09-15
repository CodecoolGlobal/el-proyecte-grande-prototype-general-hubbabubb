package com.codecool.pantry.controller.recipe;


import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.entity.pantry.PantryRecipesDto;
import com.codecool.pantry.entity.pantry.RecipeListElemDto;
import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.service.appuser.AppUserService;
import com.codecool.pantry.service.recipe.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping(path = "api/v1/recipe")
public class RecipeController {

    private final RecipeService recipeService;
    private final AppUserService appUserService;

    // TODO store it in properties!!!!
//    private final String API_KEY3 = "8dc3ef2ffcf54e6781629ee83623d725";
//    private final String API_KEY = "a22052fbcfef4a2fac111f33a93898d8";
    private final String API_KEY = "2b5973da3e1542668e205f85165a8786";
//    private final String API_KEY = "b880826d2c53495f8fb1fa608db88577";
//    private final String API_KEY = "099bdb5cd6ad48e28faab2065fdc4467";


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
        recipeService.save(recipe);
    }

    @GetMapping("/by-ingredients/{userEmail}") //
    public PantryRecipesDto pantryContent(@PathVariable String userEmail) {
        AppUser user = appUserService.getUserByEmail(userEmail);
        Pantry pantry = user.getPantry();

        PantryRecipesDto dto = new PantryRecipesDto();
        dto.setContent(pantry.getListItems());
        dto.setRecipes(getRecipeListByIngredientList(dto.getContent()));

        System.out.println("content: " + dto.getContent());
        System.out.println("recipes: " + dto.getRecipes());

        return dto;
    }

    private RecipeListElemDto[] getRecipeListByIngredientList(Set<ListItem> ingredientSet) {
        String ingredients = ingredientSet.stream().map(ListItem::getIngredientName).collect(Collectors.joining("+"));
        final String uri = String.format("https://api.spoonacular.com/recipes/findByIngredients?ingredients=%s&number=20&sort=max-used-ingredients&apiKey=%s",
                ingredients, API_KEY);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.getForObject(uri, RecipeListElemDto[].class);
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
