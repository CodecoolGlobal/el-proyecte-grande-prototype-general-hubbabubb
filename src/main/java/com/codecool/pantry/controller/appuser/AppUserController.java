package com.codecool.pantry.controller.appuser;

import com.codecool.pantry.repository.appuser.AppUserRepository;
import com.codecool.pantry.service.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/user")
@AllArgsConstructor
public class AppUserController {

    private final AppUserService service;

    @PutMapping(path = "/{user_id}")
    public String createPantry(@PathVariable Long user_id, String name) {
        return null;
    }
}
