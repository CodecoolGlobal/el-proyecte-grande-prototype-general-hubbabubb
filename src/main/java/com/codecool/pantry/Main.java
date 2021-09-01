package com.codecool.pantry;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.repository.appuser.AppUserRepository;
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

    public static void main(String[] args) throws IOException, URISyntaxException {
        SpringApplication.run(Main.class, args);
    }


    @PostConstruct
    protected void init() {
        if (userRepository.findByEmail("test@user.com").isPresent()) {
            return;
        }

        AppUser user = new AppUser();
        user.setEnabled(true);
        user.setLastName("Test");
        user.setFirstName("User");
        user.setEmail("test@user.com");
//        Pantry pantry = new Pantry();
        user.setEnabled(true);
//        user.setPantry(pantry);
//        user.setRole();
        user.setPassword(new BCryptPasswordEncoder().encode("testuser"));
        userRepository.save(user);


    }

}