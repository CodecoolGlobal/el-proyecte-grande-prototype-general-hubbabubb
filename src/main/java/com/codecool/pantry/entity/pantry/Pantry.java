package com.codecool.pantry.entity.pantry;


import com.codecool.pantry.entity.appuser.AppUser;

import javax.persistence.*;
import java.util.List;

@Entity(name = "Pantry")
public class Pantry {

    @Id
    @SequenceGenerator(
            name = "pantry_sequence",
            sequenceName = "pantry_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "pantry_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private  Long id;

    @Column(
            name = "name",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String name;

    @OneToMany(mappedBy = "pantry")
    private List<AppUser> appUsers;
}
