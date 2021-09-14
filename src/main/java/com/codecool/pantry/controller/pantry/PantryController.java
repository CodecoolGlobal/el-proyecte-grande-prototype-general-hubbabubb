package com.codecool.pantry.controller.pantry;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.listitem.GroceryItem;
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

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;
import java.util.Set;

@CrossOrigin
@AllArgsConstructor
@RestController
public class PantryController {

    private final PantryService pantryService;
    private final ListItemService itemService;
    private final AppUserService appUserService;
    private final MealPlanService mealPlanService;


    @CrossOrigin
    @GetMapping("api/v1/grocery-list/{id}")
    public Set<GroceryItem> getGroceryList(@PathVariable(value = "id") Long id, HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setStatus(200);
        var pantry = pantryService.getPantryById(id);
        return pantry.map(Pantry::getGroceryList).orElse(null);
    }

    @GetMapping("api/v1/pantry-content/{email}")
    public Set<ListItem> getPantryContent(@PathVariable(value = "email") String email, HttpServletResponse response) {
        Long id = getPantryIdByUsername(email);
        var pantry = pantryService.getPantryById(id);
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setStatus(200);
        return pantry.map(Pantry::getPantryList).orElse(null); // TODO: handle no pantry case
    }

    @GetMapping("api/v1/list-item/delete/{id}")
    public void deleteListItem(@PathVariable(value = "id") Long id,HttpServletResponse response) {

        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setStatus(200);
        itemService.removeItem(id);
    }

    @PostMapping("api/v1/grocery-list/add/{id}/{itemName}")
    public void addItemToGroceryList(@PathVariable(value = "id") Long id, @PathVariable(value = "itemName") String itemName,HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setStatus(200);
        pantryService.addGroceryItemToList(id, itemName);
    }

    @PostMapping("api/v1/pantry-list/add/{id}/{itemName}")
    public void addItemToPantryList(@PathVariable(value = "id") Long id, @PathVariable(value = "itemName") String itemName) {
        pantryService.addPantryItemToList(id, itemName);
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

    @GetMapping(path = "api/v1/pantry/{userEmail}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Pantry getPantryByEmail(@PathVariable(value = "userEmail") String userEmail) {
        AppUser user = appUserService.getUserByEmail(userEmail);
        return user.getPantry();
    }

    @GetMapping(path = "api/v1/pantry/invitation/{userEmail}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Long getPantryInvitationByEmail(@PathVariable(value = "userEmail") String userEmail) {
        AppUser user = appUserService.getUserByEmail(userEmail);
        return user.getInvitedPantryId();
    }

    private Long getPantryIdByUsername(String username) {
        AppUser user = appUserService.getUserByEmail(username);

        return user.getPantry().getId();
    }

    @GetMapping(path = "api/v1/acceptPantryInvite/{userEmail}")
    public void acceptInvitation(@PathVariable String userEmail) {
        AppUser user = appUserService.getUserByEmail(userEmail);

        Optional<Pantry> pantry = pantryService.getPantryById(user.getInvitedPantryId());

        if (pantry.isEmpty()) {
            throw new IllegalStateException("no pantry found with this ID");
        }

        user.setPantry(pantry.get());

        appUserService.save(user);
    }

    @PutMapping(path = "api/v1/{fromEmail}/invite-to-pantry/{toEmail}")
    public void inviteToPantry(@PathVariable String fromEmail, @PathVariable String toEmail) {
        AppUser toUser = appUserService.getUserByEmail(toEmail);
        AppUser fromUser = appUserService.getUserByEmail(fromEmail);
        if (toUser == null) {
            throw new IllegalStateException("No user found with this email!");
        }

        toUser.setInvitedPantryId(fromUser.getPantry().getId());

        appUserService.save(toUser);
    }
}
