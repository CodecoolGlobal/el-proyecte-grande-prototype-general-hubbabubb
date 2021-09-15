package com.codecool.pantry.service.mealplan;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.mealplan.MealPlan;
import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.repository.appuser.AppUserRepository;
import com.codecool.pantry.repository.mealplan.MealPlanRepository;
import com.codecool.pantry.repository.recipe.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class MealPlanService {

    private final MealPlanRepository mealPlanRepository;
    private final AppUserRepository appUserRepository;
    private final RecipeRepository recipeRepository;


    public List<MealPlan> getAll() {
        return mealPlanRepository.findAll();
    }

    public void saveMealPlan(Long recipeId, LocalDateTime date) {
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);
        if (recipe.isEmpty()) {
            throw new IllegalStateException("Recipe_old not found");
        }
        mealPlanRepository.save(new MealPlan(recipe.get(), date));
    }

    public MealPlan getMealPlan(Long id) {
        return mealPlanRepository.findById(id).get();
    }

    public void like(Long mealPlanId, String email) {
        Optional<AppUser> appUser = appUserRepository.findByUsername(email);
        Optional<MealPlan> mealPlan = mealPlanRepository.findById(mealPlanId);
        mealPlan.get().likesHandler(appUser.get());
        mealPlanRepository.save(mealPlan.get());
    }

    public void dislike(Long mealPlanId, String email) {
        Optional<AppUser> appUser = appUserRepository.findByUsername(email);
        Optional<MealPlan> mealPlan = mealPlanRepository.findById(mealPlanId);
        mealPlan.get().dislikesHandler(appUser.get());
        mealPlanRepository.save(mealPlan.get());
    }

}