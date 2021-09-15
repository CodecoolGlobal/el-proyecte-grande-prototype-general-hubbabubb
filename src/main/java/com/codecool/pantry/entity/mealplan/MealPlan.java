package com.codecool.pantry.entity.mealplan;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.entity.recipe.Recipe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MealPlan {

    @Id
    @SequenceGenerator(
            name = "meal_seq",
            sequenceName = "meal_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "meal_seq"
    )
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Recipe recipe;

    private LocalDateTime date;

    @ManyToOne
    private AppUser sharedBy;

    @ManyToOne
    private Pantry pantry;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<AppUser> likedUsers;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<AppUser> dislikedUsers;

    public MealPlan(Recipe recipe, LocalDateTime date, AppUser sharedBy) {
        this.recipe = recipe;
        this.date = date;
        this.sharedBy = sharedBy;
    }

    public void likesHandler(AppUser appUser) {
        if (likedUsers.contains(appUser)) {
            likedUsers.remove(appUser);
        } else {
            likedUsers.add(appUser);
        }
    }

    public void dislikesHandler(AppUser appUser) {
        if (dislikedUsers.contains(appUser)) {
            dislikedUsers.remove(appUser);
        } else {
            dislikedUsers.add(appUser);
        }
    }

    public MealPlan(Recipe recipe, LocalDateTime date, Pantry pantry, Set<AppUser> likedUsers, Set<AppUser> dislikedUsers) {
        this.recipe = recipe;
        this.date = date;
        this.pantry = pantry;
        this.likedUsers = likedUsers;
        this.dislikedUsers = dislikedUsers;
    }
}

