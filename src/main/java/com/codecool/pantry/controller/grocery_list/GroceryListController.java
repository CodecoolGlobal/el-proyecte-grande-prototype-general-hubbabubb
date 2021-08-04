package com.codecool.pantry.controller.grocery_list;

import com.codecool.pantry.entity.grocery_list.GroceryList;
import com.codecool.pantry.service.grocery_list.GroceryListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class GroceryListController {

    private final GroceryListService groceryListService;

    @Autowired
    public GroceryListController(GroceryListService groceryListService) {
        this.groceryListService = groceryListService;
    }

    @GetMapping("api/v1/grocery-list/{id}")
    public GroceryList getGroceryList(@PathVariable(value="id") Long id) {
        return groceryListService.getGroceryList(id).orElseThrow(GroceryListNotFoundException::new);
    }

    @PostMapping("api/v1/grocery-list/{id}/edit")
    public void editGroceryList(@PathVariable(value="id") Long id) {
        // TODO
        groceryListService.updateGroceryList(new GroceryList());
    }

    @ResponseStatus(value= HttpStatus.NOT_FOUND, reason="Not found Grocery List with the given ID")  // 404
    public class GroceryListNotFoundException extends RuntimeException {
        // TODO ...
    }


}
