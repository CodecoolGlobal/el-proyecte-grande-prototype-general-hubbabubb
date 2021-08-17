package com.codecool.pantry.service.listItem;

import com.codecool.pantry.entity.listitem.ListItem;
import com.codecool.pantry.repository.listItem.ListItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class ListItemService {

    private ListItemRepository listItemRepository;

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

}
