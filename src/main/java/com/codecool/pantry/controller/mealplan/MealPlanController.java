package com.codecool.pantry.controller.mealplan;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.mealplan.MealPlan;
import com.codecool.pantry.service.appuser.AppUserService;
import com.codecool.pantry.service.mealplan.MealPlanService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/meal-plan")
public class MealPlanController {

    private MealPlanService mealPlanService;
    private AppUserService appUserService;

    @GetMapping("/get-all")
    public List<MealPlan> getAll() {
        return mealPlanService.getAll();
    }

    @PostMapping(path = "/save/{recipeId}/{date}")
    public void saveMealPlan(@PathVariable("recipeId") Long recipeId, @PathVariable("date") LocalDateTime date) {
        mealPlanService.saveMealPlan(recipeId, date);
    }

    @GetMapping(path = "/like/{mealPlanId}/{userName}")
    public String toLikes(@PathVariable("mealPlanId") Long mealPlanId,
                          @PathVariable("userName") String userName) {
        mealPlanService.like(mealPlanId, userName);
        return "like route";
    }

    @GetMapping(path = "/dislike/{mealPlanId}/{userName}")
    public String toDislikes(@PathVariable("mealPlanId") Long mealPlanId,
                             @PathVariable("userName") String userName) {
        mealPlanService.dislike(mealPlanId, userName);
        return "dislike route";
    }

    @GetMapping(path = "/{id}")
    public MealPlan getMealPlan(@PathVariable("id") Long id) {
        return mealPlanService.getMealPlan(id);
    }

    @GetMapping(path="/like-checked/{mealPlanId}/{userId}")
    public boolean isLikeChecked(@PathVariable("mealPlanId") Long mealPlanId,
                     @PathVariable("userId") Long userId) {
        MealPlan mealPlan = mealPlanService.getMealPlan(mealPlanId);
        AppUser appUser = appUserService.getUserById(userId);
        return mealPlan.getLikedUsers().contains(appUser);
    }

    @GetMapping(path="/disLike-checked/{mealPlanId}/{userName}")
    public boolean isDislikeChecked(@PathVariable("mealPlanId") Long mealPlanId,
                             @PathVariable("userName") String userName) {
        MealPlan mealPlan = mealPlanService.getMealPlan(mealPlanId);
        AppUser appUser = appUserService.getUserByEmail(userName);
        return mealPlan.getDislikedUsers().contains(appUser);
    }
}
