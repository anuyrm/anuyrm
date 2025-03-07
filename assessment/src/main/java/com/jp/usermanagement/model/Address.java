package com.jp.usermanagement.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class Address {
    private String street;
    private String city;
    @NotNull
    private String postalCode;

}
