package com.codecool.pantry.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Recipe {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
//    @ManyToMany
//    private Set<Ingredient> ingredients;
    private String image;
    private int readyInMinutes;
    private int serving;

}
