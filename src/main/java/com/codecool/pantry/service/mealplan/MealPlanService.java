package com.codecool.pantry.service.mealplan;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.mealplan.MealPlan;
import com.codecool.pantry.entity.mealplan.MealPlanDto;
import com.codecool.pantry.entity.recipe.Recipe;
import com.codecool.pantry.repository.appuser.AppUserRepository;
import com.codecool.pantry.repository.mealplan.MealPlanRepository;
import com.codecool.pantry.repository.recipe.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
        mealPlanRepository.save(new MealPlan(recipe.get(), dateTime, user.get()));
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