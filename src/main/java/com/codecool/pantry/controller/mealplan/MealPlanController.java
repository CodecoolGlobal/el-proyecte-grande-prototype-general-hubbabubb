package com.codecool.pantry.controller.mealplan;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.mealplan.MealPlan;
import com.codecool.pantry.entity.mealplan.MealPlanDto;
import com.codecool.pantry.service.appuser.AppUserService;
import com.codecool.pantry.service.mealplan.MealPlanService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@AllArgsConstructor
@RestController
@CrossOrigin(origins={ "http://localhost:3000"})
@RequestMapping(path = "api/v1/meal-plan")
public class MealPlanController {

    private MealPlanService mealPlanService;
    private AppUserService appUserService;

    @GetMapping("/get-all")
    public List<MealPlan> getAll() {
        return mealPlanService.getAll();
    }

    @PostMapping(path = "/save")
    public String saveMealPlan(@RequestBody MealPlanDto mealPlanDto) {
        System.out.println("MEALPLAN CONTROLLER");
        System.out.println(mealPlanDto.getDate());
        mealPlanService.saveMealPlan(mealPlanDto);
        return "Meal Plan saved!";
    }

    @GetMapping(path = "/like/{mealPlanId}/{userName}")
    public String toLikes(@PathVariable("mealPlanId") Long mealPlanId,
                          @PathVariable("userName") String userName) {
        mealPlanService.like(mealPlanId, userName);
        return "like route";
    }

    @GetMapping(path = "/dislike/{mealPlanId}/{userName}")
    public String toDislikes(@PathVariable("mealPlanId") Long mealPlanId,
                             @PathVariable("userName") String userName) {
        mealPlanService.dislike(mealPlanId, userName);
        return "dislike route";
    }

    @GetMapping(path = "/{id}")
    public MealPlan getMealPlan(@PathVariable("id") Long id) {
        return mealPlanService.getMealPlan(id);
    }

    @GetMapping(path="/like-checked/{mealPlanId}/{userId}")
    public boolean isLikeChecked(@PathVariable("mealPlanId") Long mealPlanId,
                     @PathVariable("userId") Long userId) {
        MealPlan mealPlan = mealPlanService.getMealPlan(mealPlanId);
        AppUser appUser = appUserService.getUserById(userId);
        return mealPlan.getLikedUsers().contains(appUser);
    }

    @GetMapping(path="/disLike-checked/{mealPlanId}/{userName}")
    public boolean isDislikeChecked(@PathVariable("mealPlanId") Long mealPlanId,
                             @PathVariable("userName") String userName) {
        MealPlan mealPlan = mealPlanService.getMealPlan(mealPlanId);
        AppUser appUser = appUserService.getUserByEmail(userName);
        return mealPlan.getDislikedUsers().contains(appUser);
    }

    @GetMapping(path="/like-count/{mealPlanId}")
    public int likeCount(@PathVariable("mealPlanId") Long mealPlanId) {
        return mealPlanService.getMealPlan(mealPlanId).getLikedUsers().size();
    }

    @GetMapping(path="/dislike-count/{mealPlanId}")
    public int dislikeCount(@PathVariable("mealPlanId") Long mealPlanId) {
        return mealPlanService.getMealPlan(mealPlanId).getDislikedUsers().size();
    }

}
