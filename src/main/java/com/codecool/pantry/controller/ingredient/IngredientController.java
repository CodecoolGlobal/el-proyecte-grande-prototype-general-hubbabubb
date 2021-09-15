package com.codecool.pantry.controller.ingredient;

import com.codecool.pantry.service.ingredient.IngredientService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
public class IngredientController {

    private IngredientService service;

    @GetMapping("/api/v1/extended-ingredient")
    public Map<String, Long> getIngredientList() {
        return service.readIngredients();
    }

//    private final HashMap<Integer, String> ingredientMap = (getIngredientMapFromCsv() instanceof HashMap)
//            ? (HashMap<Integer, String>) getIngredientMapFromCsv()
//            : new HashMap<>(getIngredientMapFromCsv());
//
//    public IngredientController() throws IOException, URISyntaxException {
//    }
//
//    @GetMapping("api/v1/pantry/get_ingredient/{id}")
//        public ExtendedIngredient getIngredientFromSpoon(@PathVariable(value="id") Integer id){
//        RestTemplate restTemplate = new RestTemplate();
//        ExtendedIngredient ingredient =
//                restTemplate.getForObject("https://api.spoonacular.com/food/ingredients/"+ id +"/information?apiKey=8dc3ef2ffcf54e6781629ee83623d725", ExtendedIngredient.class);
//
//        return ingredient;
//    }
}
