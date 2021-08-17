package com.codecool.pantry.service.pantry;

import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.repository.pantry.PantryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PantryService {

    private PantryRepository pantryRepository;

    public void test() {
        pantryRepository.findById(2L);
    }

    public Optional<Pantry> getPantryById(Long id) {
        return pantryRepository.findById(id);
    }


    public void addGroceryItemToList(Long id, String itemName) {
        var pantry = getPantryById(id).get();
        var newList = pantry.getGroceryItems();
        newList.add(new ListItem(itemName));
        pantry.setGroceryItems(newList);
        pantryRepository.save(pantry);
    }

    public void addPantryItemToList(Long id, String itemName) {
        var pantry = getPantryById(id).get();
        var newList = pantry.getPantryItems();
        newList.add(new ListItem(itemName));
        pantry.setPantryItems(newList);
        pantryRepository.save(pantry);

    }
}
