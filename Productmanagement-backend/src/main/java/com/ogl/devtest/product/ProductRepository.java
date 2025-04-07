package com.ogl.devtest.product;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ProductRepository extends CrudRepository<Product, Long> {
  Optional<Product> findBySku(String sku);
}
