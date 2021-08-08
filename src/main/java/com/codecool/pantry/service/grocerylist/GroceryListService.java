package com.codecool.pantry.service.grocerylist;

import com.codecool.pantry.entity.grocerylist.GroceryList;
import com.codecool.pantry.repository.grocery_list.GroceryListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroceryListService {

    private final GroceryListRepository groceryListRepository;

    @Autowired
    public GroceryListService(GroceryListRepository groceryListRepository) {
        this.groceryListRepository = groceryListRepository;
    }


    public Optional<GroceryList> getGroceryList(Long id) {
        return groceryListRepository.findById(id);
    }

    public void updateGroceryList(GroceryList updatedGroceryList) {


    }
}
