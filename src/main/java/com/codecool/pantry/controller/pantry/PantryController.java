package com.codecool.pantry.controller.pantry;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.entity.mealplan.MealPlan;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.service.appuser.AppUserService;
import com.codecool.pantry.service.listItem.ListItemService;
import com.codecool.pantry.service.mealplan.MealPlanService;
import com.codecool.pantry.service.pantry.PantryService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@AllArgsConstructor
@RestController
public class PantryController {

    private final PantryService pantryService;
    private final ListItemService itemService;
    private final AppUserService appUserService;
    private final MealPlanService mealPlanService;


    @GetMapping("api/v1/grocery-list/{id}")
    public Set<ListItem> getGroceryList(@PathVariable(value = "id") Long id) {
        var pantry = pantryService.getPantryById(id);
        return pantry.map(Pantry::getGroceryList).orElse(null); // TODO: handle no pantry case
    }

    @GetMapping("api/v1/pantry-content/{id}")
    public Set<ListItem> getPantryContent(@PathVariable(value = "id") Long id) {
        var pantry = pantryService.getPantryById(id);
        return pantry.map(Pantry::getPantryList).orElse(null); // TODO: handle no pantry case
    }

    @GetMapping("api/v1/list-item/delete/{id}")
    public void deleteListItem(@PathVariable(value = "id") Long id) {
        itemService.removeItem(id);
    }

    @PostMapping("api/v1/grocery-list/add/{id}/{itemName}")
    public void addItemToGroceryList(@PathVariable(value = "id") Long id, @PathVariable(value = "itemName") String itemName) {
        pantryService.addGroceryItemToList(id, itemName);
    }

    @PostMapping("api/v1/pantry-list/add/{id}/{itemName}")
    public void addItemToPantryList(@PathVariable(value = "id") Long id, @PathVariable(value = "itemName") String itemName) {
        pantryService.addPantryItemToList(id, itemName);
    }

    @PostMapping("api/v1/pantry-app-user/add/{id}/{userId}")
    public void addPantryAppuser(@PathVariable(value = "id") Long id, @PathVariable(value = "userId") Long userId) {
        AppUser appUser = appUserService.getUserById(userId);
        pantryService.addPantryAppUser(id, appUser);
    }

    @PostMapping("api/v1/pantry-app-user/remove/{id}/{userId}")
    public void removePantryAppuser(@PathVariable(value = "id") Long id, @PathVariable(value = "userId") Long userId) {
        AppUser appUser = appUserService.getUserById(userId);
        pantryService.removePantryAppUser(id, appUser);
    }

    @PostMapping("api/v1/meal-plan/add/{id}/{mealPlanId}")
    public void addMealPlan(@PathVariable(value = "id") Long id, @PathVariable(value = "mealPlanId") Long mealPlanId) {
        MealPlan mealPlan = mealPlanService.getMealPlan(id);
        pantryService.addMealPlan(id, mealPlan);
    }

    @PostMapping("api/v1/meal-plan/remove/{id}/{mealPlanId}")
    public void removeMealPlan(@PathVariable(value = "id") Long id, @PathVariable(value = "mealPlanId") Long mealPlanId) {
        MealPlan mealPlan = mealPlanService.getMealPlan(id);
        pantryService.removeMealPlan(id, mealPlan);
    }

    @GetMapping("api/v1/item-status/{id}")
    public void changeItemCheckedStatus(@PathVariable(value = "id") Long id) {
        ListItem updatedItem = itemService.toggleItemStatus(itemService.getItemById(id));
        itemService.updateListItem(updatedItem);
    }

    @GetMapping(path = "api/v1/pantry/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Pantry getPantryById(@PathVariable(value = "id") Long id) {
        Pantry pantry = pantryService.getPantryById(id).orElseThrow(() -> new IllegalStateException("Can not find pantry !"));
        System.out.println("---PANTRY: " + pantry.getName());
        return pantry;
    }
}
