package com.codecool.pantry.controller.mealplan;

import com.codecool.pantry.service.mealplan.MealPlanService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/")
public class MealPlanController {

    private MealPlanService mealPlanService;

    @GetMapping(path = "likes/{operation}/{mealPlanId}/{userId}")
    public String toLikes(@PathVariable("operation") String operation,
                             @PathVariable("mealPlanId") String mealPlanId,
                             @PathVariable("userId") String userId) {
        mealPlanService.likes(operation, mealPlanId, userId);
        return "likes route";
    }

    @GetMapping(path = "dislikes/{operation}/{mealPlanId}/{userId}")
    public String toDislikes(@PathVariable("operation") String operation,
                             @PathVariable("mealPlanId") String mealPlanId,
                             @PathVariable("userId") String userId) {
        mealPlanService.dislikes(operation, mealPlanId, userId);
        return "dislikes route";
    }
}
