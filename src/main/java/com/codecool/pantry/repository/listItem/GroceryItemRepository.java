package com.codecool.pantry.repository.listItem;

import com.codecool.pantry.entity.listitem.GroceryItem;
import com.codecool.pantry.entity.listitem.ListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroceryItemRepository extends JpaRepository<GroceryItem, Long> {
}
