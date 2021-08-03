package com.codecool.pantry.service.ingredients;

import java.util.Set;

public class Ingredient{
    private Integer id;
    private String originalName;
    private String shoppingListUnits;
    private Set<String> cookingListUnits;

    public Ingredient(Integer id, String originalName, String shoppingListUnits, Set<String> cookingListUnits) {
        this.id = id;
        this.originalName = originalName;
        this.shoppingListUnits = shoppingListUnits;
        this.cookingListUnits = cookingListUnits;
    }

    public Integer getId() {
        return id;
    }

    public String getOriginalName() {
        return originalName;
    }

    public String getShoppingListUnits() {
        return shoppingListUnits;
    }

    public Set<String> getCookingListUnits() {
        return cookingListUnits;
    }
}
