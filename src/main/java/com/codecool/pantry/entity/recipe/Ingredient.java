package com.codecool.pantry.entity.recipe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ingredient {

    @Id
    @Column(name = "id", unique=true, nullable = false)
//    @GeneratedValue(strategy =GenerationType.SEQUENCE)
    private Long id;

    private String name;
    private String unit;
    private int amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", referencedColumnName = "id")
    private Recipe recipe;
}
