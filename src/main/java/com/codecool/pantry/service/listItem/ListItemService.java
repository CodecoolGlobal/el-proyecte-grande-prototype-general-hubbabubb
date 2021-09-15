package com.codecool.pantry.service.listItem;

import com.codecool.pantry.entity.listitem.ItemType;
import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.repository.listItem.ListItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class ListItemService {

    private final ListItemRepository listItemRepository;

    public void removeItem(Long id) {
        listItemRepository.deleteById(id);
    }

    public ListItem getItemById(Long id) {
        return listItemRepository.getById(id);
    }


    public ListItem toggleItemStatus(ListItem listItem) {
        listItem.setChecked(!listItem.isChecked());
        return listItem;
    }

    public void updateListItem(ListItem listItem) {
        listItemRepository.save(listItem);
    }

    public void addToGrocery(Long id) {
        ListItem item = getItemById(id);

        ListItem newGroceryItem = new ListItem();

        newGroceryItem.setItemType(ItemType.GROCERY_LIST);
        newGroceryItem.setIngredientName(item.getIngredientName());


        listItemRepository.save(item);
    }
}
