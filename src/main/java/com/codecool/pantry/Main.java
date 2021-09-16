package com.codecool.pantry;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.repository.appuser.AppUserRepository;
import com.codecool.pantry.repository.listItem.ListItemRepository;
import com.codecool.pantry.repository.mealplan.MealPlanRepository;
import com.codecool.pantry.repository.pantry.PantryRepository;
import com.codecool.pantry.repository.recipe.RecipeRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URISyntaxException;

@SpringBootApplication
@AllArgsConstructor
public class Main {


    private final AppUserRepository userRepository;
    private final PantryRepository pantryRepository;
    private final MealPlanRepository mealPlanRepository;
    private final ListItemRepository listItemRepository;
    private final RecipeRepository recipeRepository;

    public static void main(String[] args) throws IOException, URISyntaxException {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @PostConstruct
    protected void init() {
        if (userRepository.findByUsername("test@user.com").isPresent()) {
            return;
        }

        AppUser user = new AppUser();
        Pantry pantry = new Pantry();

        user.setEnabled(true);
        user.setLastName("Code");
        user.setFirstName("Cooler");
        user.setUsername("test@user.com");
        user.setPassword(new BCryptPasswordEncoder().encode("testuser"));
        user.setEnabled(true);

        AppUser user2 = new AppUser();
        user2.setFirstName("Dániel");
        user2.setLastName("Tokai");
        user2.setUsername("tokai@dani.hu");
        user2.setPassword(new BCryptPasswordEncoder().encode("dani"));
        user2.setEnabled(true);

        AppUser user3 = new AppUser();
        user3.setFirstName("Marcell");
        user3.setLastName("Siket");
        user3.setUsername("siket@marci.hu");
        user3.setPassword(new BCryptPasswordEncoder().encode("marci"));
        user3.setEnabled(true);

        AppUser user4 = new AppUser();
        user4.setFirstName("Soufi");
        user4.setLastName("Irbouh");
        user4.setUsername("soufi@cool.hu");
        user4.setPassword(new BCryptPasswordEncoder().encode("cooler"));
        user4.setEnabled(true);

        pantryRepository.save(pantry);
        user2.setPantry(pantry);
        user3.setPantry(pantry);
        user4.setPantry(pantry);
        user.setPantry(pantry);
        userRepository.save(user);

        userRepository.save(user2);
        userRepository.save(user3);
        userRepository.save(user4);
    }

}