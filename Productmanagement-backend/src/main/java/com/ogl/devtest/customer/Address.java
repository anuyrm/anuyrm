package com.ogl.devtest.customer;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Address {
    @NotNull
    private String street;
    @NotNull
    private String city;
    @NotNull
    private String county;
    @NotNull
    private String postcode;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
