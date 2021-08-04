package com.codecool.pantry;

import com.codecool.pantry.service.ingredients.Ingredient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.net.URISyntaxException;

@SpringBootApplication
public class Main {

	public static void main(String[] args) throws IOException, URISyntaxException {SpringApplication.run(Main.class, args); }

}