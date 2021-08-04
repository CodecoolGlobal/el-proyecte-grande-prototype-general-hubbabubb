package com.codecool.pantry.repository.grocery_list;

import com.codecool.pantry.entity.grocery_list.GroceryList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroceryListRepository extends JpaRepository<GroceryList, Long> {


    Optional<GroceryList> findById(Long id);



//    // TODO: Query or best practice to update entity
//    void updateGroceryList(GroceryList updatedGroceryList);


}
