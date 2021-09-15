package com.codecool.pantry.entity.mealplan;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class MealPlanDto {

    private Long recipeId;
    private String date;
    private String userName;
}
