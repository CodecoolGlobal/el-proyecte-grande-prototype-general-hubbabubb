package com.codecool.pantry.entity.mealplan;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.recipe.Recipe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MealPlan {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Recipe recipe;

    private LocalDateTime date;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<AppUser> likes;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<AppUser> dislikes;

    public MealPlan(Recipe recipe, LocalDateTime date) {
        this.recipe = recipe;
        this.date = date;
    }

    public void likesHandler(AppUser appUser) {
        if (likes.contains(appUser)) {
            likes.remove(appUser);
        }
        else {
            likes.add(appUser);
        }
    }

    public void dislikesHandler(AppUser appUser) {
        if (dislikes.contains(appUser)) {
            dislikes.remove(appUser);
        }
        else {
            dislikes.add(appUser);
        }
    }

}
