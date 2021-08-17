package com.codecool.pantry.entity.listitem;

import com.codecool.pantry.entity.pantry.Pantry;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;

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
    private boolean checked;

    private LocalDateTime expirationDate; //How important is it? Maybe in the future?

//    private Pantry pantry;

    public ListItem(String name) {
        this.ingredientName = name;
    }

    public ListItem(String ingredientName, double amount, String unit) {
        this.ingredientName = ingredientName;
        this.amount = amount;
        this.unit = unit;
        this.important = false;
        this.checked = false;    // [] - kenyér  [naptár]   [kuka]
     }
}
