package com.codecool.pantry.entity.recipe;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExtendedIngredient {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;
    private String unit;
    private int amount;

    @JsonIgnore
    @ManyToMany(mappedBy = "extendedIngredients")
    private Set<Recipe> recipes = new HashSet<>();
}
