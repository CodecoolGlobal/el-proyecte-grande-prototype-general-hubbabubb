package com.codecool.pantry.entity.recipe;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Recipe {

    @Id
    private Long id;
    private String name;
    @ManyToMany
    private Set<Ingredient> ingredients;
    private String image;
    private int readyInMinutes;
    private int serving;

}
