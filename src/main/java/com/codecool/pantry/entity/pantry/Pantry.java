package com.codecool.pantry.entity.pantry;


import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.entity.listitem.ListItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "pantry")
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
    private String name = "My Pantry";

    @OneToMany(mappedBy = "pantry")
    private Set<AppUser> pantryAppUsers = new HashSet<>();

    @OneToMany(mappedBy = "pantry")
    private Set<ListItem> groceryItems = new HashSet<>();

    @OneToMany(mappedBy = "pantry")
    private Set<ListItem> pantryItems = new HashSet<>();
}
