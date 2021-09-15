package com.codecool.pantry.entity.pantry;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
public class RecipeListDto {

    private Set<RecipeListElemDto> listElemDtoSet;
}
