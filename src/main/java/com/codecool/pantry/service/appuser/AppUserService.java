package com.codecool.pantry.service.appuser;

import com.codecool.pantry.entity.appuser.AppUser;
import com.codecool.pantry.security.registration.token.ConfirmationToken;
import com.codecool.pantry.security.registration.token.ConfirmationTokenService;
import com.codecool.pantry.repository.appuser.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final AppUserRepository repository;
    private final BCryptPasswordEncoder encoder;
    private final ConfirmationTokenService service;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format("Can not find user: %s", email)));
    }

    public String signUpUser(AppUser user) {
        boolean userExists = repository.findByEmail(user.getEmail())
                .isPresent();
        if (userExists) {
            throw new IllegalStateException("This email is already taken!");
        }
        String encodedPassword = encoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        repository.save(user);

        String randomToken = UUID.randomUUID().toString();
        ConfirmationToken token = new ConfirmationToken(
                randomToken,
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(1),
                user
        );
        service.saveConfirmationToken(token);


        return randomToken;
    }

    public void enableAppUser(String email) {
        repository.enableAppUser(email);
    }
}
