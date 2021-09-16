package com.codecool.pantry.service.pantry;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.listitem.GroceryItem;
import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.entity.mealplan.MealPlan;
import com.codecool.pantry.entity.mealplan.MealPlanDto;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.repository.appuser.AppUserRepository;
import com.codecool.pantry.repository.pantry.PantryRepository;
import com.codecool.pantry.repository.recipe.RecipeRepository;
import com.codecool.pantry.service.recipe.RecipeService;
import javassist.compiler.ast.Pair;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class PantryService {

    private PantryRepository pantryRepository;
    private RecipeRepository recipeRepository;
    private AppUserRepository appUserRepository;


    public Optional<Pantry> getPantryById(Long id) {
        return pantryRepository.findById(id);
    }

    public void addGroceryItemToList(Long id, String itemName) {
        if (getPantryById(id).isEmpty()) {
            return;
        }


        Pantry pantry = getPantryById(id).get();

        Set<GroceryItem> newList = pantry.getGroceryList();

        var newItem = new GroceryItem(itemName);
        newItem.setPantry(pantry);
        newList.add(newItem);

        pantry.setGroceryList(newList);
        pantryRepository.save(pantry);
    }

    public void addPantryItemToList(Long id, String itemName) {
        if (getPantryById(id).isEmpty()) {
            return;
        }
        Pantry pantry = getPantryById(id).get();
        Set<ListItem> newList = pantry.getPantryList();
        var newItem = new ListItem(itemName);
        newItem.setPantry(pantry);
        newList.add(newItem);
        pantry.setPantryList(newList);
        pantryRepository.save(pantry);
    }

    public void moveItemsBetweenGroceryAndPantry(Long id, Set<ListItem> changedItems, boolean fromGroceryToPantry) {
        if (getPantryById(id).isEmpty()) {
            return;
        }
        Pantry pantry = getPantryById(id).get();

        Set<GroceryItem> groceryList = pantry.getGroceryList();
        Set<ListItem> pantryList = pantry.getPantryList();

        if (fromGroceryToPantry) {
            pantryList.addAll(changedItems);
            groceryList.removeAll(changedItems);
        } else {
//            groceryList.addAll(changedItems);
            pantryList.removeAll(changedItems);
        }

        pantry.setPantryList(pantryList);
        pantry.setGroceryList(groceryList);
        pantryRepository.save(pantry);
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

    public void saveMealPlan(MealPlanDto mealPlanDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(mealPlanDto.getDate(), formatter);

        Optional<Recipe> recipe = recipeRepository.findById(mealPlanDto.getRecipeId());
        if (recipe.isEmpty()) {
            throw new IllegalStateException("Recipe_old not found");
        }
        Optional<AppUser> user = appUserRepository.findByUsername(mealPlanDto.getUserName());
        if (user.isEmpty()) {
            throw new IllegalStateException("User not found");
        }
        MealPlan mealPlan = new MealPlan(recipe.get(), dateTime, user.get());
        Pantry pantry = user.get().getPantry();
        Set<MealPlan> mealPlans = pantry.getMealPlans();
        mealPlans.add(mealPlan);
        pantry.setMealPlans(mealPlans);
        pantryRepository.save(pantry);
    }
}
