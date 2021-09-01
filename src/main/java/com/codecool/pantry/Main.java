package com.codecool.pantry;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.repository.appuser.AppUserRepository;
import com.codecool.pantry.repository.pantry.PantryRepository;
import com.codecool.pantry.security.PasswordEnconder;
import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URISyntaxException;

@SpringBootApplication
@AllArgsConstructor
public class Main {

    private PasswordEnconder passwordEnconder;

    private AppUserRepository userRepository;

    private PantryRepository pantryRepository;

    public static void main(String[] args) throws IOException, URISyntaxException {
        SpringApplication.run(Main.class, args);
    }


    @PostConstruct
    protected void init() {
        if (userRepository.findByUsername("test@user.com").isPresent()) {
            return;
        }

        AppUser user = new AppUser();
        user.setEnabled(true);
        user.setLastName("Test");
        user.setFirstName("User");
        user.setUsername("test@user.com");
        Pantry pantry = new Pantry();
        pantryRepository.save(pantry);
        user.setEnabled(true);
        user.setPantry(pantry);
        user.setPassword(new BCryptPasswordEncoder().encode("testuser"));
        userRepository.save(user);


    }

}