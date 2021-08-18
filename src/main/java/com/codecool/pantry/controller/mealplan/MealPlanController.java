package com.codecool.pantry.controller.mealplan;

import com.codecool.pantry.entity.mealplan.MealPlan;
import com.codecool.pantry.service.mealplan.MealPlanService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/meal-plan")
public class MealPlanController {

    private MealPlanService mealPlanService;

    @PostMapping(path = "/save")
    public void saveMealPlan(@RequestBody MealPlan mealPlan) {
        mealPlanService.saveMealPlan(mealPlan);
    }

    @GetMapping(path = "/like/{mealPlanId}/{userId}")
    public String toLikes(@PathVariable("mealPlanId") Long mealPlanId,
                             @PathVariable("userId") Long userId) {
        mealPlanService.like(mealPlanId, userId);
        return "likes route" + mealPlanId + " " + userId;
    }

    @GetMapping(path = "/dislike/{mealPlanId}/{userId}")
    public String toDislikes(@PathVariable("mealPlanId") Long mealPlanId,
                             @PathVariable("userId") Long userId) {
        mealPlanService.dislike(mealPlanId, userId);
        return "dislikes route";
    }

    @GetMapping(path = "/{id}")
    public MealPlan getMealPlan(@PathVariable("id") Long id) {
        return mealPlanService.getMealPlan(id);
    }
}
