package com.codecool.pantry.service.pantry;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.listitem.ItemType;
import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.entity.mealplan.MealPlan;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.repository.pantry.PantryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class PantryService {

    private final PantryRepository pantryRepository;

    public Optional<Pantry> getPantryById(Long id) {
        return pantryRepository.findById(id);
    }

    public ListItem addGroceryItemToList(Pantry pantry, String itemName) {
        ListItem listItem = new ListItem();
        listItem.setIngredientName(itemName);
        listItem.setItemType(ItemType.GROCERY_LIST);
        pantry.getListItems().add(listItem);

        pantryRepository.save(pantry);
        return listItem;
    }

    public void addPantryItemToList(Pantry pantry, String itemName) {
        ListItem listItem = new ListItem();
        listItem.setIngredientName(itemName);
        listItem.setItemType(ItemType.PANTRY_CONTENT);
        pantry.getListItems().add(listItem);

        pantryRepository.save(pantry);
    }

    public void moveItemsBetweenGroceryAndPantry(Long id, Set<ListItem> changedItems, boolean fromGroceryToPantry) {

    }

    public void addPantryAppUser(Long id, AppUser appUser) {
        Optional<Pantry> pantry = getPantryById(id);
        if (pantry.isEmpty()) {
            return;
        }

        Set<AppUser> appUsers = pantry.get().getPantryAppUsers();
        appUsers.add(appUser);
        pantryRepository.save(pantry.get());
    }

    public void removePantryAppUser(Long id, AppUser appUser) {
        if (getPantryById(id).isEmpty()) {
            return;
        }
        Pantry pantry = getPantryById(id).get();
        Set<AppUser> appUsers = pantry.getPantryAppUsers();
        appUsers.remove(appUser);
        pantryRepository.save(pantry);
    }

    public void addMealPlan(Long id, MealPlan mealPlan) {
        if (getPantryById(id).isEmpty()) {
            return;
        }
        Pantry pantry = getPantryById(id).get();
        Set<MealPlan> mealPlans = pantry.getMealPlans();
        mealPlans.add(mealPlan);
        pantryRepository.save(pantry);
    }

    public void removeMealPlan(Long id, MealPlan mealPlan) {
        if (getPantryById(id).isEmpty()) {
            return;
        }
        Pantry pantry = getPantryById(id).get();
        Set<MealPlan> mealPlans = pantry.getMealPlans();
        mealPlans.remove(mealPlans);
        pantryRepository.save(pantry);
    }

    public void removePantryItems(Pantry pantry) {
        Set<ListItem> selectedItems = new HashSet<>();
        for (ListItem listItem: pantry.getListItems()) {
            if (listItem.getItemType().equals(ItemType.PANTRY_CONTENT)
                    && listItem.isChecked()) selectedItems.add(listItem);
        }

        pantry.getListItems().removeAll(selectedItems);

        pantryRepository.save(pantry);
    }

    public void changeSelectedToGroceryList(Pantry pantry) {
        for (ListItem listItem: pantry.getListItems()) {
            if (listItem.getItemType().equals(ItemType.PANTRY_CONTENT)
                    && listItem.isChecked()) {
                listItem.setItemType(ItemType.GROCERY_LIST);
                listItem.setChecked(false);
            }
        }

        pantryRepository.save(pantry);
    }
}
