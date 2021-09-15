package com.codecool.pantry.entity.pantry;

import com.codecool.pantry.entity.listitem.ListItem;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
public class PantryRecipesDto {
    private Set<ListItem> content;
    private RecipeListElemDto[] recipes;

}
