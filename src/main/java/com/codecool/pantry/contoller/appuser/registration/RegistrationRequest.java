package com.codecool.pantry.contoller.appuser.registration;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class RegistrationRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
