package com.ogl.devtest.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.*;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        customerRepository.delete(customer);
        customer.setId(id);
        return ResponseEntity.ok(customerRepository.save(customer));
    }

}
