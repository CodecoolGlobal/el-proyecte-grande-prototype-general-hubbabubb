package com.codecool.pantry.entity.listitem;

import com.codecool.pantry.entity.pantry.Pantry;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@Setter
@Getter
@Entity
public class GroceryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String ingredientName;
    private boolean important;
    private boolean checked;
    private LocalDateTime expirationDate; //How important is it? Maybe in the future?

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pantry_id")
    private Pantry pantry;

    public GroceryItem(String ingredientName) {
        this.ingredientName = ingredientName;
        this.important = false;
        this.checked = false;
    }


    public GroceryItem() {

    }
}