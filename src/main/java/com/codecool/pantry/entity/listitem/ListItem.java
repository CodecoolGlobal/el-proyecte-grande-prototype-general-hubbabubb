package com.codecool.pantry.entity.listitem;

import com.codecool.pantry.entity.pantry.Pantry;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@Setter
@Getter
@Entity
@NoArgsConstructor
public class ListItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String ingredientName;
    private boolean important;
    private boolean checked;
    private LocalDateTime expirationDate; //How important is it? Maybe in the future?

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pantry_id")
    private Pantry pantry;

    public ListItem(String ingredientName) {
        this.ingredientName = ingredientName;
        this.important = false;
        this.checked = false;
    }
}
