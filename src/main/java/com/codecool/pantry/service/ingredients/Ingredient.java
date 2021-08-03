package com.codecool.pantry.service.ingredients;

import com.codecool.pantry.repository.ingredients.IngredientCsvReader;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Set;

public class Ingredient{
    private Integer id;
    private String originalName;
    private String shoppingListUnits;
    private Set<String> cookingListUnits;
}
