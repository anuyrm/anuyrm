package com.ogl.devtest.customer;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @NotNull
  private String name;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "id")
  private Address address;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }
}
