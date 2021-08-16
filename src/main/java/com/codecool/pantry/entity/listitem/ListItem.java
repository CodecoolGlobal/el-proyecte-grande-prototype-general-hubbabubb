package com.codecool.pantry.entity.listitem;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@AllArgsConstructor
@Setter
@Getter
@Entity
@NoArgsConstructor
public class ListItem {

    @Id
    private Long id;

    @Column(nullable = false)
    private String ingredientName;

    private double amount; // 0.5 paradicsom --> Spoon -> half potato---> megfőzöm --> ingr--> ????  // TODO : amount type spoonacular
    private String unit;
    private boolean important;

    private LocalDateTime expirationDate;


}
