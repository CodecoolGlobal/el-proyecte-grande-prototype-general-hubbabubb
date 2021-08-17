package com.codecool.pantry.service.pantry;

import com.codecool.pantry.repository.pantry.PantryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PantryService {

    private PantryRepository pantryRepository;


    public void test() {
        pantryRepository.findById(2L);
    }


}
