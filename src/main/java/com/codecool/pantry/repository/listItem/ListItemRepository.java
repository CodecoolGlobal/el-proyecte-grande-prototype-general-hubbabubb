package com.codecool.pantry.repository.listItem;

import com.codecool.pantry.entity.listitem.ListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListItemRepository extends JpaRepository<ListItem, Long> {

}
