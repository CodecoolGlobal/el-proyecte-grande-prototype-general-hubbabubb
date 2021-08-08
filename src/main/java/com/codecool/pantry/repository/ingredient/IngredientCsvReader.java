package com.codecool.pantry.repository.ingredient;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;


public interface IngredientCsvReader {
    default Map<Integer,String> getIngredientMapFromCsv() throws IOException, URISyntaxException {
        String filePath = "data/ingredient_list.csv";
        ClassLoader classLoader = getClass().getClassLoader();

        Stream<String> lines = Files.lines(Path.of(Objects.requireNonNull(classLoader.getResource(filePath)).toURI()));
        Map<Integer,String> ingredientMap = lines.map(line -> line.split(";"))
                .collect(Collectors.toMap(line -> Integer.parseInt(line[1]), line ->line[0]));
        lines.close();

        return ingredientMap;
    }
}
