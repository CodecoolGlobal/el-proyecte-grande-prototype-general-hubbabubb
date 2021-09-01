package com.codecool.pantry.controller.mealplan;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.mealplan.MealPlan;
import com.codecool.pantry.service.appuser.AppUserService;
import com.codecool.pantry.service.mealplan.MealPlanService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/meal-plan")
public class MealPlanController {

    private MealPlanService mealPlanService;
    private AppUserService appUserService;

    @PostMapping(path = "/save/{recipeId}/{date}")
    public void saveMealPlan(@PathVariable("recipeId") Long recipeId, @PathVariable("date") LocalDateTime date) {
        mealPlanService.saveMealPlan(recipeId, date);
    }

    @GetMapping(path = "/like/{mealPlanId}/{userId}")
    public String toLikes(@PathVariable("mealPlanId") Long mealPlanId,
                          @PathVariable("userId") Long userId) {
        mealPlanService.like(mealPlanId, userId);
        return "like route" + mealPlanId + " " + userId;
    }

    @GetMapping(path = "/dislike/{mealPlanId}/{userId}")
    public String toDislikes(@PathVariable("mealPlanId") Long mealPlanId,
                             @PathVariable("userId") Long userId) {
        mealPlanService.dislike(mealPlanId, userId);
        return "dislike route";
    }

    @GetMapping(path = "/{id}")
    public MealPlan getMealPlan(@PathVariable("id") Long id) {
        return mealPlanService.getMealPlan(id);
    }

    @GetMapping(path="/likeChecked/{mealPlanId}/{userId}")
    public boolean isLikeChecked(@PathVariable("mealPlanId") Long mealPlanId,
                     @PathVariable("userId") Long userId) {
        MealPlan mealPlan = mealPlanService.getMealPlan(mealPlanId);
        AppUser appUser = appUserService.getUserById(userId);
        return mealPlan.getLikedUsers().contains(appUser);
    }

    @GetMapping(path="/disLikeChecked/{mealPlanId}/{userId}")
    public boolean isDislikeChecked(@PathVariable("mealPlanId") Long mealPlanId,
                             @PathVariable("userId") Long userId) {
        MealPlan mealPlan = mealPlanService.getMealPlan(mealPlanId);
        AppUser appUser = appUserService.getUserById(userId);
        return mealPlan.getDislikedUsers().contains(appUser);
    }
}
