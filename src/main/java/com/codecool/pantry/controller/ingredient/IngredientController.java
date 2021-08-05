package com.codecool.pantry.controller.ingredient;


import com.codecool.pantry.repository.ingredient.IngredientCsvReader;
import com.codecool.pantry.service.ingredient.Ingredient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;

@RestController
public class IngredientController implements IngredientCsvReader {

    private final HashMap<Integer, String> ingredientMap = (getIngredientMapFromCsv() instanceof HashMap)
            ? (HashMap<Integer, String>) getIngredientMapFromCsv()
            : new HashMap<>(getIngredientMapFromCsv());

    public IngredientController() throws IOException, URISyntaxException {
    }

    @GetMapping("/api/v1/pantry/get_ingredients")
    public HashMap<Integer, String> getIngredientList() {
        return ingredientMap;
    }

    @GetMapping("api/v1/pantry/get_ingredient/{id}")
        public Ingredient getIngredientFromSpoon(@PathVariable(value="id") Integer id){
        RestTemplate restTemplate = new RestTemplate();
        Ingredient ingredient =
                restTemplate.getForObject("https://api.spoonacular.com/food/ingredients/"+ id +"/information?apiKey=8dc3ef2ffcf54e6781629ee83623d725", Ingredient.class);

        return ingredient;
    }
}
