package com.jp.usermanagement.repository;


import com.jp.usermanagement.model.User;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class UserRepository {
    private final Map<Long, User> users = new HashMap<>();

    public User save(User user) {
        users.put(user.getId(), user);
        return user;
    }

    public Optional<User> findByEmail(String email) {
        return  users.values()
                .stream()
                .filter(user ->  user.getEmails() != null &&  user.getEmails().stream()
                        .anyMatch(e -> e.equalsIgnoreCase(email)))
                .findFirst();

    }

    public Optional<User> getUser(Long id) {
        return Optional.ofNullable(users.get(id));
    }

    public void deleteById(Long id) {
        if (!users.containsKey(id)) {
            throw new IllegalArgumentException("User not found");
        }
        users.remove(id);
    }

    public Optional<User> updateUser(Long id, User updatedUser) {
        if (!users.containsKey(id)) {
            throw new IllegalArgumentException("User not found");
        }
        updatedUser.setId(id);
        users.put(id, updatedUser);
        return Optional.ofNullable(users.get(id));
    }
}