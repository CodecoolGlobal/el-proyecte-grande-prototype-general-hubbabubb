package com.codecool.pantry.entity.mealplan;

import lombok.*;

import java.time.LocalDateTime;

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
