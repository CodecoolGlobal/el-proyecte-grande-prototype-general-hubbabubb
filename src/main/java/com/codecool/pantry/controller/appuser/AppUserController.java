package com.codecool.pantry.controller.appuser;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.recipe.RecipeDto;
import com.codecool.pantry.service.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/appuser")
@AllArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;
    private final ModelMapper modelMapper;

    @GetMapping(path = "/is-favorite/{recipeId}/{userEmail}")
    public boolean isRecipeFavorite(@PathVariable Long recipeId, @PathVariable String userEmail) {
        AppUser user = appUserService.getUserByEmail(userEmail);

        return user.getFavorites().stream().anyMatch(recipe -> recipe.getId().equals(recipeId));
    }

    @GetMapping(path = "/favorites/{userEmail}")
    public RecipeDto[] getFavorites(@PathVariable String userEmail) {
        AppUser user = appUserService.getUserByEmail(userEmail);
        RecipeDto[] dto = modelMapper.map(user.getFavorites(), RecipeDto[].class);
        return dto;
    }
}
