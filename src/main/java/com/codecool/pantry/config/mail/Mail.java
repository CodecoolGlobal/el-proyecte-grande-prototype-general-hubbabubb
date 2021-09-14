package com.codecool.pantry.config.mail;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Mail {
    private String mailTo;
    private String mailFrom;
    private String Subject;
    private Map<String, Object> props;
}
