package com.codecool.pantry.service.pantry;

import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.repository.pantry.PantryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class PantryService {

    private PantryRepository pantryRepository;

    public Optional<Pantry> getPantryById(Long id) {
        return pantryRepository.findById(id);
    }

    public void addGroceryItemToList(Long id, String itemName) {
        if (getPantryById(id).isEmpty()) {
            return;
        }
        Pantry pantry = getPantryById(id).get();
        Set<ListItem> newList = pantry.getGroceryList();
        newList.add(new ListItem(itemName));
        pantry.setGroceryList(newList);
        pantryRepository.save(pantry);
    }

    public void addPantryItemToList(Long id, String itemName) {
        if (getPantryById(id).isEmpty()) {
            return;
        }
        Pantry pantry = getPantryById(id).get();
        Set<ListItem> newList = pantry.getPantryList();
        newList.add(new ListItem(itemName));
        pantry.setPantryList(newList);
        pantryRepository.save(pantry);
    }

    public void moveItemsBetweenGroceryAndPantry(Long id, Set<ListItem> changedItems, boolean fromGroceryToPantry) {
        if (getPantryById(id).isEmpty()) {
            return;
        }
        Pantry pantry = getPantryById(id).get();

        Set<ListItem> groceryList = pantry.getGroceryList();
        Set<ListItem> pantryList = pantry.getPantryList();

        if (fromGroceryToPantry){
            pantryList.addAll(changedItems);
            groceryList.removeAll(changedItems);
        }
        else {
            groceryList.addAll(changedItems);
            pantryList.removeAll(changedItems);
        }

        pantry.setPantryList(pantryList);
        pantry.setGroceryList(groceryList);
        pantryRepository.save(pantry);
    }
}
