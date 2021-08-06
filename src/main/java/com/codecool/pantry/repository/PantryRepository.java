package com.codecool.pantry.repository;

import com.codecool.pantry.entity.Pantry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PantryRepository extends JpaRepository<Pantry, Long> {
}
