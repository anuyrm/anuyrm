package com.jp.usermanagement.model;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@NoArgsConstructor
public class User {
    private Long id;

    private String firstName;
    private String lastName;

    private String title;

    private LocalDate dateOfBirth;
    private List<Address> addresses;

    private List<String> emails;
    private String homePhone;

    private String mobilePhone;


    public User(List<String> emails) {
        this.emails = emails;
    }

}
