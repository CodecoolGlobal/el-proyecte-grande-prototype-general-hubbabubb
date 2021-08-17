package com.codecool.pantry.repository.mealplan;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.mealplan.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {

//    @Transactional
//    @Modifying
//    @Query("")
//    public void addToLikes(String mealPlanId, AppUser appUser);
//
//    @Transactional
//    @Modifying
//    @Query("")
//    public void removeFromLikes(String mealPlanId, AppUser appUser);
//
//    @Transactional
//    @Modifying
//    @Query("")
//    public void addToDislikes(String mealPlanId, AppUser appUser);
//
//    @Transactional
//    @Modifying
//    @Query("")
//    public void removeFromDislikes(String mealPlanId, AppUser appUser);

}
