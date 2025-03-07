package com.jp.usermanagement.service;

import com.jp.usermanagement.model.User;
import com.jp.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    private long idCounter = 1;

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        if (user.getEmails() == null || user.getEmails().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        user.setId(idCounter++);
        userRepository.save(user);
        return user;
    }

    public Optional<User> searchUsersByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUser(Long id) {
        return userRepository.getUser(id);
    }

    public Optional<User> updateUser(Long id, User updatedUser) {
        return userRepository.updateUser(id,updatedUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}
