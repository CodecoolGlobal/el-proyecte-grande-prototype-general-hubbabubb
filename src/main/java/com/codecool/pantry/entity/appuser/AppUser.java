package com.codecool.pantry.entity.appuser;

import com.codecool.pantry.entity.pantry.Pantry;
import com.codecool.pantry.entity.recipe.Recipe;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EqualsAndHashCode
@Table(name = "app_user")
public class AppUser implements UserDetails {

    @Id
    @SequenceGenerator(
            name = "user_seq",
            sequenceName = "user_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_seq"
    )
    private Long id;

    private String firstName;

    @Column(
            nullable = false
    )
    private String lastName;

    @Column(
            nullable = false
    )
    private String username;

    @Column(
            nullable = false
    )
    private String password;

    @Enumerated(EnumType.STRING)
    private AppUserRole role = AppUserRole.FREE;
    private boolean locked = false;
    private boolean enabled = false;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="pantry_id", referencedColumnName = "id")
    private Pantry pantry;

    private Long invitedPantryId;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "favorites",
            joinColumns = @JoinColumn(name = "app_user_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id")
    )
    private Set<Recipe> favorites = new HashSet<>();

    public AppUser(String firstName, String lastName, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public void addRecipeToFavorite(Recipe recipe) {
        favorites.add(recipe);
    }

    public void removeFromFavorite(Recipe recipe) {
        favorites.remove(recipe);
    }
}
