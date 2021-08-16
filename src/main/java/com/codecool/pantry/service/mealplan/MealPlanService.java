package com.codecool.pantry.service.mealplan;

import com.codecool.pantry.repository.mealplan.MealPlanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class MealPlanService {

    private final MealPlanRepository mealPlanRepository;

    public void likes(String operation, String mealPlanId, String userId) {
        if (operation.equals("add")) {
            mealPlanRepository.addToLikes(mealPlanId, userId);
        }
        else {
            mealPlanRepository.removeFromLikes(mealPlanId, userId);
        }
    }

    public void dislikes(String operation, String mealPlanId, String userId) {
        if (operation.equals("add")) {
            mealPlanRepository.addToDislikes(mealPlanId, userId);
        }
        else {
            mealPlanRepository.removeFromDislikes(mealPlanId, userId);
        }
    }
}
