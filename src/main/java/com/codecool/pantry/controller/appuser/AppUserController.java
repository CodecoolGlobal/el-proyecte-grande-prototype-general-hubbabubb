package com.codecool.pantry.controller.appuser;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.service.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/user")
@AllArgsConstructor
public class AppUserController {

    private final AppUserService service;

    @PutMapping(path = "/{user_id}")
    public String createPantry(@PathVariable Long userId, String name) {
        return null;
    }

    /*@CrossOrigin(origins = "http://localhost/")
    @GetMapping
    public AppUser getUser(Authentication authentication) {
        AppUser user = null;
        UserDetails details = (UserDetails) authentication.getPrincipal();
        if (details != null) {
            user = (AppUser) service.loadUserByUsername(details.getUsername());
        }

        return user;
    }*/

    @CrossOrigin(origins = "http://localhost/")
    @GetMapping(path = "/default")
    public AppUser getDefaultUser() {
        AppUser appUser = service.getUserByEmail("user@pantry.hu");
        System.out.println("---appUser: " + appUser);
        return appUser;
    }
}
