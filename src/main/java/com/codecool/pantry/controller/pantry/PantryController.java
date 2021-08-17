package com.codecool.pantry.controller.pantry;

import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.service.pantry.PantryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@AllArgsConstructor
@RestController
public class PantryController {

    private final PantryService pantryService;


//
//    @GetMapping("api/v1/grocery-list/{id}")
//    public Set<ListItem> getGroceryList(@PathVariable(value="id")Long id) {
//    }
//
//    /@PostMapping("api/v1/grocery-list/{id}/edit")
//    public void editGroceryList(@PathVariable(value="id") Long id) {
//        TODO
//        groceryListService.updateGroceryList(new GroceryList());
//    }

//    @ResponseStatus(value= HttpStatus.NOT_FOUND, reason="Not found Grocery List with the given ID")  // 404
//    public class GroceryListNotFoundException extends RuntimeException {
//        TODO ...
//    }


}
