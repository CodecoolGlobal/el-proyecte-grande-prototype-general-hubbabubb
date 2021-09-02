package com.codecool.pantry.entity.pantry;


import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.listitem.GroceryItem;
import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.entity.mealplan.MealPlan;
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
@Getter
@Setter
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
    private Long id;

    @Column(
            name = "name",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String name = "My Pantry";

    @JsonManagedReference
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.ALL)
    private Set<AppUser> pantryAppUsers = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.ALL)
    private Set<GroceryItem> groceryList = new HashSet<>();


    @JsonManagedReference
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.ALL)
    private Set<ListItem> pantryList = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.ALL)
    private Set<MealPlan> mealPlans = new HashSet<>();
}

