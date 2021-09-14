package com.codecool.pantry;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.repository.appuser.AppUserRepository;
import com.codecool.pantry.repository.listItem.GroceryItemRepository;
import com.codecool.pantry.repository.listItem.ListItemRepository;
import com.codecool.pantry.repository.mealplan.MealPlanRepository;
import com.codecool.pantry.repository.pantry.PantryRepository;
import com.codecool.pantry.repository.recipe.RecipeRepository;
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

    private final PasswordEnconder passwordEnconder;

    private final AppUserRepository userRepository;
    private final PantryRepository pantryRepository;
    private final MealPlanRepository mealPlanRepository;
    private final ListItemRepository listItemRepository;
    private final RecipeRepository recipeRepository;
    private final GroceryItemRepository groceryItemRepository;

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
        user.setLastName("Code");
        user.setFirstName("Cooler");
        user.setUsername("test@user.com");
        user.setPassword(new BCryptPasswordEncoder().encode("testuser"));
        user.setEnabled(true);

//        Recipe recipe1 = new Recipe(
//                1096042L,
//                "Hasselback Potatoes", "https://spoonacular.com/recipeImages/1096042-556x370.jpg",
//                true, false, false, true, true, 8,
//                "<ol><li>Wash the potatoes, peel if you like.</li><li>Place each one on a spoon fitting the spud best in size  I used large serving spoon.</li><li>With a very sharp knife, make incisions almost to the bottom of the potato but making sure the base is intact, about 2mm apart.</li><li>Season all over with salt and pepper.</li><li>Heat an ovenproof tray on the hob, melt 2 tbsp butter and 4 tbsp oil and add potatoes, sliced side down, when hot.</li><li>Fry for a minute, then turn them over, baste with the frying oil and butter and put in the oven preheated to 200C/400F/gas mark 6.</li><li>Bake for 40 minutes to 1 hour, depending on the size.</li><li>In the meantime, mix fresh minced herbs into 2 tbsp softened butter and after the first stage of baking baste the potatoes with the herby butter. You can use any herbs you like, rosemary is an especially great choice.</li><li>Return them to the oven for another 10-20 minutes (based on size!), check if ready by squashing them gently or pricking with a sharp knife and serve immediately.</li></ol>",
//                "You can never have too many side dish recipes, so give Hasselback Potatoes a try. This gluten free, lacto ovo vegetarian, and fodmap friendly recipe serves 4 and costs <b>61 cents per serving</b>. One serving contains <b>280 calories</b>, <b>5g of protein</b>, and <b>13g of fat</b>. It is brought to you by Foodista. 1 person were impressed by this recipe. Head to the store and pick up fresh herbs, oil, butter, and a few other things to make it today. From preparation to the plate, this recipe takes around <b>1 hour</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 66%</b>. This score is good. Similar recipes include <a href=\"https://spoonacular.com/recipes/brown-butter-hasselback-potatoes-accordion-potatoes-1224775\">Brown Butter Hasselback Potatoes (Accordion Potatoes)</a>, <a href=\"https://spoonacular.com/recipes/brown-butter-hasselback-potatoes-accordion-potatoes-161656\">Brown Butter Hasselback Potatoes (Accordion Potatoes)</a>, and <a href=\"https://spoonacular.com/recipes/hasselback-potatoes-43784\">Hasselback Potatoes</a>.",
//                null);
//        Recipe recipe2 = new Recipe(
//                641693L,
//                "Duchess Potatoes", "https://spoonacular.com/recipeImages/641693-556x370.jpg",
//                true, true, true, true, true, 19,
//                "<ol><li>Wash the potatoes, peel if you like.</li><li>Place each one on a spoon fitting the spud best in size  I used large serving spoon.</li><li>With a very sharp knife, make incisions almost to the bottom of the potato but making sure the base is intact, about 2mm apart.</li><li>Season all over with salt and pepper.</li><li>Heat an ovenproof tray on the hob, melt 2 tbsp butter and 4 tbsp oil and add potatoes, sliced side down, when hot.</li><li>Fry for a minute, then turn them over, baste with the frying oil and butter and put in the oven preheated to 200C/400F/gas mark 6.</li><li>Bake for 40 minutes to 1 hour, depending on the size.</li><li>In the meantime, mix fresh minced herbs into 2 tbsp softened butter and after the first stage of baking baste the potatoes with the herby butter. You can use any herbs you like, rosemary is an especially great choice.</li><li>Return them to the oven for another 10-20 minutes (based on size!), check if ready by squashing them gently or pricking with a sharp knife and serve immediately.</li></ol>",
//                "You can never have too many side dish recipes, so give Hasselback Potatoes a try. This gluten free, lacto ovo vegetarian, and fodmap friendly recipe serves 4 and costs <b>61 cents per serving</b>. One serving contains <b>280 calories</b>, <b>5g of protein</b>, and <b>13g of fat</b>. It is brought to you by Foodista. 1 person were impressed by this recipe. Head to the store and pick up fresh herbs, oil, butter, and a few other things to make it today. From preparation to the plate, this recipe takes around <b>1 hour</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 66%</b>. This score is good. Similar recipes include <a href=\"https://spoonacular.com/recipes/brown-butter-hasselback-potatoes-accordion-potatoes-1224775\">Brown Butter Hasselback Potatoes (Accordion Potatoes)</a>, <a href=\"https://spoonacular.com/recipes/brown-butter-hasselback-potatoes-accordion-potatoes-161656\">Brown Butter Hasselback Potatoes (Accordion Potatoes)</a>, and <a href=\"https://spoonacular.com/recipes/hasselback-potatoes-43784\">Hasselback Potatoes</a>.",
//                null);
//        Recipe recipe3 = new Recipe(
//                660322L,
//                "Smashed Fried Lemon Potatoes", "https://spoonacular.com/recipeImages/660322-556x370.png",
//                false, true, false, true, true, 24,
//                "<ol><li>Wash the potatoes, peel if you like.</li><li>Place each one on a spoon fitting the spud best in size  I used large serving spoon.</li><li>With a very sharp knife, make incisions almost to the bottom of the potato but making sure the base is intact, about 2mm apart.</li><li>Season all over with salt and pepper.</li><li>Heat an ovenproof tray on the hob, melt 2 tbsp butter and 4 tbsp oil and add potatoes, sliced side down, when hot.</li><li>Fry for a minute, then turn them over, baste with the frying oil and butter and put in the oven preheated to 200C/400F/gas mark 6.</li><li>Bake for 40 minutes to 1 hour, depending on the size.</li><li>In the meantime, mix fresh minced herbs into 2 tbsp softened butter and after the first stage of baking baste the potatoes with the herby butter. You can use any herbs you like, rosemary is an especially great choice.</li><li>Return them to the oven for another 10-20 minutes (based on size!), check if ready by squashing them gently or pricking with a sharp knife and serve immediately.</li></ol>",
//                "You can never have too many side dish recipes, so give Hasselback Potatoes a try. This gluten free, lacto ovo vegetarian, and fodmap friendly recipe serves 4 and costs <b>61 cents per serving</b>. One serving contains <b>280 calories</b>, <b>5g of protein</b>, and <b>13g of fat</b>. It is brought to you by Foodista. 1 person were impressed by this recipe. Head to the store and pick up fresh herbs, oil, butter, and a few other things to make it today. From preparation to the plate, this recipe takes around <b>1 hour</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 66%</b>. This score is good. Similar recipes include <a href=\"https://spoonacular.com/recipes/brown-butter-hasselback-potatoes-accordion-potatoes-1224775\">Brown Butter Hasselback Potatoes (Accordion Potatoes)</a>, <a href=\"https://spoonacular.com/recipes/brown-butter-hasselback-potatoes-accordion-potatoes-161656\">Brown Butter Hasselback Potatoes (Accordion Potatoes)</a>, and <a href=\"https://spoonacular.com/recipes/hasselback-potatoes-43784\">Hasselback Potatoes</a>.",
//                null);
//        Recipe recipe4 = new Recipe(
//                658151L,
//                "Refreshing Zucchini and Potatoess", "https://spoonacular.com/recipeImages/658151-556x370.jpg",
//                true, false, true, false, false, 31,
//                "<ol><li>Wash the potatoes, peel if you like.</li><li>Place each one on a spoon fitting the spud best in size  I used large serving spoon.</li><li>With a very sharp knife, make incisions almost to the bottom of the potato but making sure the base is intact, about 2mm apart.</li><li>Season all over with salt and pepper.</li><li>Heat an ovenproof tray on the hob, melt 2 tbsp butter and 4 tbsp oil and add potatoes, sliced side down, when hot.</li><li>Fry for a minute, then turn them over, baste with the frying oil and butter and put in the oven preheated to 200C/400F/gas mark 6.</li><li>Bake for 40 minutes to 1 hour, depending on the size.</li><li>In the meantime, mix fresh minced herbs into 2 tbsp softened butter and after the first stage of baking baste the potatoes with the herby butter. You can use any herbs you like, rosemary is an especially great choice.</li><li>Return them to the oven for another 10-20 minutes (based on size!), check if ready by squashing them gently or pricking with a sharp knife and serve immediately.</li></ol>",
//                "You can never have too many side dish recipes, so give Hasselback Potatoes a try. This gluten free, lacto ovo vegetarian, and fodmap friendly recipe serves 4 and costs <b>61 cents per serving</b>. One serving contains <b>280 calories</b>, <b>5g of protein</b>, and <b>13g of fat</b>. It is brought to you by Foodista. 1 person were impressed by this recipe. Head to the store and pick up fresh herbs, oil, butter, and a few other things to make it today. From preparation to the plate, this recipe takes around <b>1 hour</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 66%</b>. This score is good. Similar recipes include <a href=\"https://spoonacular.com/recipes/brown-butter-hasselback-potatoes-accordion-potatoes-1224775\">Brown Butter Hasselback Potatoes (Accordion Potatoes)</a>, <a href=\"https://spoonacular.com/recipes/brown-butter-hasselback-potatoes-accordion-potatoes-161656\">Brown Butter Hasselback Potatoes (Accordion Potatoes)</a>, and <a href=\"https://spoonacular.com/recipes/hasselback-potatoes-43784\">Hasselback Potatoes</a>.",
//                null);
//        recipeRepository.saveAll(List.of(recipe1, recipe2, recipe3, recipe4));
//
//        LocalDateTime now = LocalDateTime.now();
//        MealPlan mealPlan1 = new MealPlan();
//        mealPlan1.setDate(now);
//        mealPlan1.setRecipe(recipe1);
//        MealPlan mealPlan2 = new MealPlan();
//        mealPlan2.setDate(now.plusDays(2));
//        mealPlan2.setRecipe(recipe2);
//        MealPlan mealPlan3 = new MealPlan();
//        mealPlan3.setDate(now.plusDays(4));
//        mealPlan3.setRecipe(recipe3);
//        MealPlan mealPlan4 = new MealPlan();
//        mealPlan4.setDate(now.plusDays(5));
//        mealPlan4.setRecipe(recipe4);
////        mealPlanRepository.saveAll(List.of(mealPlan1, mealPlan2, mealPlan3, mealPlan4));
//
//        ListItem listItem1 = new ListItem();
//        listItem1.setChecked(true);
//        listItem1.setId(10014534L);
//        listItem1.setIngredientName("amaretto");
//        ListItem listItem2 = new ListItem();
//        listItem2.setId(11098L);
//        listItem2.setIngredientName("brussel sprouts");
//        ListItem listItem3 = new ListItem();
//        listItem3.setId(20041L);
//        listItem3.setIngredientName("cooked brown rice");
//        ListItem listItem4 = new ListItem();
//        listItem4.setChecked(true);
//        listItem4.setId(43382L);
//        listItem4.setIngredientName("cranberry juice");
//        ListItem listItem5 = new ListItem();
//        listItem5.setId(11935L);
//        listItem5.setIngredientName("ketchup");
//        ListItem listItem6 = new ListItem();
//        listItem6.setId(10011282L);
//        listItem6.setIngredientName("red onion");
//        listItemRepository.saveAll(Set.of(listItem1, listItem2, listItem3, listItem4, listItem5, listItem6));
//
//        GroceryItem groceryItem1 = new GroceryItem();
//        groceryItem1.setId(11304L);
//        groceryItem1.setIngredientName("peas");
//        GroceryItem groceryItem2 = new GroceryItem();
//        groceryItem2.setId(4073L);
//        groceryItem2.setIngredientName("margarine");
//        GroceryItem groceryItem3 = new GroceryItem();
//        groceryItem3.setId(9176L);
//        groceryItem3.setIngredientName("mango");
//        groceryItemRepository.saveAll(Set.of(groceryItem1, groceryItem2, groceryItem3));
//
        Pantry pantry = new Pantry();
//        pantry.setMealPlans(Set.of(mealPlan1, mealPlan2, mealPlan3, mealPlan4));
//        pantry.setPantryList(Set.of(listItem1, listItem2, listItem3, listItem4, listItem5, listItem6));
//        pantry.setGroceryList(Set.of(groceryItem1, groceryItem2, groceryItem3));
//        pantryRepository.save(pantry);
        AppUser user2 = new AppUser();
        user2.setFirstName("Daniel");
        user2.setLastName("Tokai");
        user2.setUsername("tokai@dani.hu");
        user2.setPassword(new BCryptPasswordEncoder().encode("dani"));
        user2.setEnabled(true);
        user2.setPantry(pantry);

        user.setPantry(pantry);
        userRepository.save(user);

        userRepository.save(user2);
    }

}