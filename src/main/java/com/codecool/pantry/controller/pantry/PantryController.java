package com.codecool.pantry.controller.pantry;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.appuser.AppUserDto;
import com.codecool.pantry.entity.listitem.ItemType;
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

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping(path = "api/v1/pantry")
public class PantryController {

    private final PantryService pantryService;
    private final ListItemService itemService;
    private final AppUserService appUserService;
    private final MealPlanService mealPlanService;

    @GetMapping("/grocery-list/{userEmail}")
    public Set<ListItem> getGroceryList(@PathVariable String userEmail) {
        Set<ListItem> listItems = getListItems(userEmail);

        return listItems
                .stream()
                .filter(listItem -> listItem.getItemType().equals(ItemType.GROCERY_LIST))
                .collect(Collectors.toSet());
    }

    @GetMapping("/pantry-content/{userEmail}")
    public Set<ListItem> getPantryContent(@PathVariable String userEmail) {
        Set<ListItem> listItems = getListItems(userEmail);
        Set<ListItem> items = listItems
                .stream()
                .filter(listItem -> listItem.getItemType().equals(ItemType.PANTRY_CONTENT))
                .collect(Collectors.toSet());
        return items;
    }

    @DeleteMapping("/pantry-item/delete-selected/{userEmail}")
    public void deletePantryItems(@PathVariable String userEmail) {
        Pantry pantry = getPantryByEmail(userEmail);

        pantryService.removePantryItems(pantry);
    }

    @PutMapping("list-item/add-to-grocery-item/{id}/{userEmail}")
    public void addPantryItemToGroceryItem(@PathVariable Long id, @PathVariable String userEmail) {
        ListItem item = itemService.getItemById(id);
        Pantry pantry = getPantryByEmail(userEmail);
        pantryService.addGroceryItemToList(pantry, item.getIngredientName());
    }

    @PutMapping("list-item/change-selected-to-grocery-item/{userEmail}")
    public void changeSelectedListItemToGrocery(@PathVariable String userEmail) {
        Pantry pantry = getPantryByEmail(userEmail);
        pantryService.changeSelectedToGroceryList(pantry);
    }

    @PutMapping("/grocery-list/add/{userEmail}/{itemName}")
    public ListItem addItemToGroceryList(@PathVariable String userEmail, @PathVariable String itemName) {
        Pantry pantry = getPantryByEmail(userEmail);

        return pantryService.addGroceryItemToList(pantry, itemName);
    }

    @PutMapping("/pantry-list/add/{userEmail}/{itemName}")
    public Set<ListItem> addItemToPantryList(@PathVariable String userEmail, @PathVariable String itemName) {
        Pantry pantry = getPantryByEmail(userEmail);
        pantryService.addPantryItemToList(pantry, itemName);
        return pantry.getListItems().stream()
                .filter(listItem -> listItem.getItemType().equals(ItemType.PANTRY_CONTENT))
                .collect(Collectors.toSet());
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

    @PutMapping("/toggle-item-status/{id}")
    public void changeItemCheckedStatus(@PathVariable(value = "id") Long id) {
        ListItem updatedItem = itemService.toggleItemStatus(itemService.getItemById(id));
        itemService.updateListItem(updatedItem);
    }

    @GetMapping(path = "/invitation/{userEmail}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Long getPantryInvitationByEmail(@PathVariable(value = "userEmail") String userEmail) {
        AppUser user = appUserService.getUserByEmail(userEmail);
        return user.getInvitedPantryId();
    }

    @PutMapping(path = "acceptPantryInvite/{userEmail}")
    public void acceptInvitation(@PathVariable String userEmail) {
        AppUser user = appUserService.getUserByEmail(userEmail);

        Optional<Pantry> pantry = pantryService.getPantryById(user.getInvitedPantryId());

        if (pantry.isEmpty()) {
            throw new IllegalStateException("no pantry found with this ID");
        }

        user.setPantry(pantry.get());
        user.setInvitedPantryId(null);
        appUserService.save(user);
    }

    @PutMapping(path = "/refusePantryInvite/{userEmail}")
    public void refuseInvitation(@PathVariable String userEmail) {
        AppUser user = appUserService.getUserByEmail(userEmail);
        user.setInvitedPantryId(null);

        appUserService.save(user);
    }

    @PutMapping(path = "/{fromEmail}/invite-to-pantry/{toEmail}")
    public void inviteToPantry(@PathVariable String fromEmail, @PathVariable String toEmail) {
        AppUser toUser = appUserService.getUserByEmail(toEmail);
        AppUser fromUser = appUserService.getUserByEmail(fromEmail);
        if (toUser == null) {
            throw new IllegalStateException("No user found with this email!");
        }

        toUser.setInvitedPantryId(fromUser.getPantry().getId());

        appUserService.save(toUser);
    }

    @GetMapping(path = "/users/{userEmail}")
    public Set<AppUserDto> getPantryUsers(@PathVariable String userEmail) {
        Pantry pantry = getPantryByEmail(userEmail);

        Set<AppUserDto> pantryUsers = new HashSet<>();

        for (AppUser user : pantry.getPantryAppUsers()) {
            if (!user.getUsername().equals(userEmail)) {
                AppUserDto userDto = new AppUserDto();
                userDto.setFirstName(user.getFirstName());
                userDto.setLastName(user.getLastName());
                userDto.setUserName(user.getUsername());
                pantryUsers.add(userDto);
            }
        }

        return pantryUsers;
    }

    private Set<ListItem> getListItems(String userEmail) {
        Pantry pantry = getPantryByEmail(userEmail);
        return pantry.getListItems();
    }

    public Pantry getPantryByEmail(String userEmail) {
        AppUser user = appUserService.getUserByEmail(userEmail);
        return user.getPantry();
    }
}
