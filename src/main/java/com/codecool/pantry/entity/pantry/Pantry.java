package com.codecool.pantry.entity.pantry;


import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.listitem.GroceryItem;
import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.entity.mealplan.MealPlan;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity(name = "pantry")
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
    private Long id;

    @Column(
            name = "name",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String name = "My Pantry";

    @JsonIgnore
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.MERGE)
    private Set<AppUser> pantryAppUsers = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.MERGE)
    private Set<GroceryItem> groceryList = new HashSet<>();


    @JsonManagedReference
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.MERGE)
    private Set<ListItem> pantryList = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.MERGE)
    private Set<MealPlan> mealPlans = new HashSet<>();
}

