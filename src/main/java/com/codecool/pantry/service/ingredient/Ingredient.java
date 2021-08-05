package com.codecool.pantry.service.ingredient;

import java.util.ArrayList;

public class Ingredient {
    private Integer id;
    private String originalName;
    private ArrayList<String> possibleUnits;
    private ArrayList<String> shoppingListUnits;

    public Ingredient(){

    }

    public Ingredient(Integer id, String originalName, ArrayList<String> possibleUnits, ArrayList<String> shoppingListUnits) {
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

    public ArrayList<String> getPossibleUnits() {
        return possibleUnits;
    }

    public Ingredient setPossibleUnits(ArrayList<String> possibleUnits) {
        this.possibleUnits = possibleUnits;
        return this;
    }

    public ArrayList<String> getShoppingListUnits() {
        return shoppingListUnits;
    }

    public Ingredient setShoppingListUnits(ArrayList<String> shoppingListUnits) {
        this.shoppingListUnits = shoppingListUnits;
        return this;
    }
}