package com.codecool.pantry.controller.pantry;

import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.repository.listItem.ListItemRepository;
import com.codecool.pantry.service.listItem.ListItemService;
import com.codecool.pantry.service.pantry.PantryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@AllArgsConstructor
@RestController
public class PantryController {

    private final PantryService pantryService;
    private final ListItemService itemService;

    @GetMapping("api/v1/grocery-list/{id}")
    public Set<ListItem> getGroceryList(@PathVariable(value = "id") Long id) {
        var pantry = pantryService.getPantryById(id);
        return pantry.map(Pantry::getGroceryItems).orElse(null); // TODO: handle no pantry case
    }

    @GetMapping("api/v1/pantry-content/{id}")
    public Set<ListItem> getPantryContent(@PathVariable(value = "id") Long id) {
        var pantry = pantryService.getPantryById(id);
        return pantry.map(Pantry::getPantryItems).orElse(null); // TODO: handle no pantry case
    }


    @GetMapping("api/v1/list-item/delete/{id}")
    public void deleteListItem(@PathVariable(value = "id") Long id) {
        itemService.removeItem(id);
    }

    @PostMapping("api/v1/grocery-list/add/{id}/{itemName}")
    public void addItemToGroceryList(@PathVariable(value="id") Long id, @PathVariable(value = "itemName") String itemName) {
       pantryService.addGroceryItemToList(id, itemName);
    }

    @PostMapping("api/v1/pantry-list/add/{id}/{itemName}")
    public void addItemToPantryList(@PathVariable(value="id") Long id, @PathVariable(value = "itemName") String itemName) {
       pantryService.addPantryItemToList(id, itemName);
    }

//    @ResponseStatus(value= HttpStatus.NOT_FOUND, reason="Not found List with the given ID")  // 404
//    public class ListNotFoundException extends RuntimeException {
//    }


}
