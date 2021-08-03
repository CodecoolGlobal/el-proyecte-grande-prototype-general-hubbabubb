package com.codecool.pantry.controller.ingredients;


import com.codecool.pantry.repository.ingredients.IngredientCsvReader;
import com.codecool.pantry.service.ingredients.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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



}
