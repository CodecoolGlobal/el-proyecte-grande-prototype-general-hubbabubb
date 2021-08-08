package com.codecool.pantry.service.ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

@Service
public class IngredientService {

    @Autowired
    private ResourceLoader resourceLoader;

    private static final String CSV_LOCATION = "data/ingredient_list.csv";
    private final static String CSV_DELIMITER = ";";

    public Map<String, Long> readIngredients() {
        Map<String, Long> records = new HashMap<>();

        Resource resource = resourceLoader.getResource("classpath:" + CSV_LOCATION);

        try {
            Scanner scanner = new Scanner(resource.getFile());
            while (scanner.hasNextLine()) {
                String csvLine = scanner.nextLine();
                String[] split = csvLine.split(CSV_DELIMITER);
                Long id = Long.parseLong(split[1]);
                records.put(split[0], id);
            }
        } catch (IOException e) {
            throw new IllegalStateException(String.format("File not found in path: %s", CSV_LOCATION), e);
        }

        return  records;
    }
}
