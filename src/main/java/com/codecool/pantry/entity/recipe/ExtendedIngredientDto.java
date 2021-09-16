package com.codecool.pantry.entity.recipe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExtendedIngredientDto {
    private Long id;
    private String name;
    private String unit;
    private int amount;
}
