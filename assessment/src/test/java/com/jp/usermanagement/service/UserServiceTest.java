package com.jp.usermanagement.service;

import com.jp.usermanagement.model.User;
import com.jp.usermanagement.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmails(Collections.singletonList("test@example.com"));
    }

    @Test
    void testCreateUser() {
        when(userRepository.save(any(User.class))).thenReturn(user);

        User createdUser = userService.createUser(user);

        assertNotNull(createdUser);
        assertEquals(1L, createdUser.getId());
        assertEquals("test@example.com", createdUser.getEmails().get(0));

        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testCreateUserWithoutEmailShouldThrowException() {
        User invalidUser = new User();

        Exception exception = assertThrows(IllegalArgumentException.class, () -> userService.createUser(invalidUser));
        assertEquals("Email is required", exception.getMessage());
    }

    @Test
    void testSearchUsersByEmail() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        Optional<User> result = userService.searchUsersByEmail("test@example.com");

        assertTrue(result.isPresent());
        assertEquals("test@example.com", result.get().getEmails().get(0));

        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testGetUser() {
        when(userRepository.getUser(1L)).thenReturn(Optional.of(user));

        Optional<User> retrievedUser = userService.getUser(1L);

        assertTrue(retrievedUser.isPresent());
        assertEquals(1L, retrievedUser.get().getId());

        verify(userRepository, times(1)).getUser(1L);
    }

    @Test
    void testUpdateUser() {
        User updatedUser = new User();
        updatedUser.setEmails(Collections.singletonList("updated@example.com"));

        when(userRepository.updateUser(1L, updatedUser)).thenReturn(Optional.of(updatedUser));

        Optional<User> result = userService.updateUser(1L, updatedUser);

        assertTrue(result.isPresent());
        assertEquals("updated@example.com", result.get().getEmails().get(0));

        verify(userRepository, times(1)).updateUser(1L, updatedUser);
    }

    @Test
    void testDeleteUser() {
        doNothing().when(userRepository).deleteById(1L);
        userService.deleteUser(1L);
        verify(userRepository, times(1)).deleteById(1L);
    }

}
