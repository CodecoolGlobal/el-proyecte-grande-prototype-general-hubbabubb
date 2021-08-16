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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AppUser> likes;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AppUser> dislikes;

}
