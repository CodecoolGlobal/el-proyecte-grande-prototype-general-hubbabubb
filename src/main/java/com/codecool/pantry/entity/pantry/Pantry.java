package com.codecool.pantry.entity.pantry;


import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.entity.mealplan.MealPlan;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Entity(name = "pantry")
@Getter
@Setter
public class Pantry {

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<AppUser> getPantryAppUsers() {
        return pantryAppUsers;
    }

    public void setPantryAppUsers(Set<AppUser> pantryAppUsers) {
        this.pantryAppUsers = pantryAppUsers;
    }

    public Set<ListItem> getGroceryList() {
        return groceryList;
    }

    public void setGroceryList(Set<ListItem> groceryList) {
        this.groceryList = groceryList;
    }

    public Set<ListItem> getPantryList() {
        return pantryList;
    }

    public void setPantryList(Set<ListItem> pantryList) {
        this.pantryList = pantryList;
    }

    public Set<MealPlan> getMealPlans() {
        return mealPlans;
    }

    public void setMealPlans(Set<MealPlan> mealPlans) {
        this.mealPlans = mealPlans;
    }

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
    @OneToMany(mappedBy = "pantry",cascade = CascadeType.ALL)
    private Set<AppUser> pantryAppUsers = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.ALL)
    private Set<ListItem> groceryList = new HashSet<>();


    @JsonManagedReference
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.ALL)
    private Set<ListItem> pantryList = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "pantry", cascade = CascadeType.ALL)
    private Set<MealPlan> mealPlans = new HashSet<>();
}


// ingredient -> pantry -> appuser -> pantry(appuser-> grocerylist-> asdsartfwerzhgojkterfhpgotrgjhoigfjh