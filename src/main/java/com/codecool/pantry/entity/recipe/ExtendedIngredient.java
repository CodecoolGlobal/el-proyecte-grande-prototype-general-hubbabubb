package com.codecool.pantry.entity.recipe;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExtendedIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;
    private String unit;
    private int amount;

    @JsonIgnore
    @ManyToMany(mappedBy = "extendedIngredients")
    private Set<Recipe> recipes = new HashSet<>();
}
