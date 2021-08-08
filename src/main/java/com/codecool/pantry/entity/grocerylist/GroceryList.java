package com.codecool.pantry.entity.grocerylist;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class GroceryList {

    @Id
    @SequenceGenerator(
            name = "grocery_seq",
            sequenceName = "grocery_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "grocery_seq"
    )
    private Long id;

}
