package com.codecool.pantry.entity;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.service.ingredients.Ingredient;

import javax.persistence.*;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Entity(name = "Pantry")
public class Pantry {

    @Id
    @SequenceGenerator(
            name = "pantry_sequence",
            sequenceName = "pantry_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "pantry_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private  Long id;
    private String name;
    @OneToMany
    private Set<AppUser> users = new HashSet<>();

    //TODO: Make Ingredients class immutable for HashMap usage
    //@OneToMany(mappedBy = "pantry")
    //private Map<Ingredient, Integer> ingredientQuantity = new HashMap<>();
}
