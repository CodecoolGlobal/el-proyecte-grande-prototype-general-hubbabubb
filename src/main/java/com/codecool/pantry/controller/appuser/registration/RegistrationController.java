package com.codecool.pantry.controller.appuser.registration;

import com.codecool.pantry.service.appuser.registration.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService service;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {

        return service.register(request);
    }

    @GetMapping(path = "confirm")
    public void confirm(@RequestParam("token") String token, HttpServletResponse response) throws IOException {
        service.confirmToken(token);

        response.sendRedirect("localhost:3000/confirmed");
    }
}
