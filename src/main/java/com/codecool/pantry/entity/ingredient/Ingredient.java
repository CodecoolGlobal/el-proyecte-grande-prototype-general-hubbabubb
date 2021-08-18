package com.codecool.pantry.entity.ingredient;

import java.util.List;

public class Ingredient {
    private Integer id;
    private String originalName;
    private List<String> possibleUnits;
    private List<String> shoppingListUnits;

    public Ingredient(Integer id, String originalName, List<String> possibleUnits, List<String> shoppingListUnits) {
        this.id = id;
        this.originalName = originalName;
        this.possibleUnits = possibleUnits;
        this.shoppingListUnits = shoppingListUnits;
    }

    public Integer getId() {
        return id;
    }

    public Ingredient setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getOriginalName() {
        return originalName;
    }

    public Ingredient setOriginalName(String originalName) {
        this.originalName = originalName;
        return this;
    }

    public List<String> getPossibleUnits() {
        return possibleUnits;
    }

    public Ingredient setPossibleUnits(List<String> possibleUnits) {
        this.possibleUnits = possibleUnits;
        return this;
    }

    public List<String> getShoppingListUnits() {
        return shoppingListUnits;
    }

    public Ingredient setShoppingListUnits(List<String> shoppingListUnits) {
        this.shoppingListUnits = shoppingListUnits;
        return this;
    }
}