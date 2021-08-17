package com.codecool.pantry.repository.pantry;

import com.codecool.pantry.entity.pantry.Pantry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PantryRepository extends JpaRepository<Pantry, Long> {

}