package com.codecool.pantry.repository.mealplan;

import com.codecool.pantry.entity.mealplan.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {


}
