package com.codecool.pantry.service.listItem;

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

    public void toggleItemStatus(Long id) {
//        listItemRepository.setCheckedStatus(!listItemRepository.getById(id).isChecked());
    }

}
