package com.codecool.pantry.entity.listitem;

import com.codecool.pantry.entity.pantry.Pantry;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ListItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String ingredientName;
    private boolean important = false;
    private boolean checked = false;
    private LocalDateTime expirationDate;

    @JsonIgnore
    @ManyToMany(mappedBy = "listItems")
    private Set<Pantry> pantry;

    @Enumerated(EnumType.STRING)
    private ItemType itemType;
}
