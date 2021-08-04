package com.codecool.pantry.contoller.recipe;


import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.repository.appuser.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@AllArgsConstructor
@RestController
public class RecipeController {

    private final RecipeRepository recipeRepository;

    @PostMapping
    public void createClient(@RequestBody Recipe recipe) {
        recipeRepository.save(recipe);
    }

    @GetMapping("api/v1/recipe/search/{name}")
    public ResponseEntity<String> searchRecipe(@PathVariable(value = "name") String name) {
        final String uri = String.format("https://api.spoonacular.com/recipes/complexSearch?query=%s&number=25&apiKey=8dc3ef2ffcf54e6781629ee83623d725", name);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
        return result;
    }

    @GetMapping("api/v1/recipe/{id}")
    public ResponseEntity<String> test(@PathVariable(value = "id") Long id) {
        final String uri = String.format("https://api.spoonacular.com/recipes/%s/information?apiKey=8dc3ef2ffcf54e6781629ee83623d725", id);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
        return result;
    }
}
