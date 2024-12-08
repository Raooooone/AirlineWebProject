package com.example.tunisiaairlinemanagementbackend.service;

import com.example.tunisiaairlinemanagementbackend.Entity.User;
import com.example.tunisiaairlinemanagementbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    // Explicit constructor-based dependency injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String signupUsers(List<User> users) {
        for (User user : users) {
            if (userRepository.existsByUsername(user.getUsername())) {
                return "Username already exists: " + user.getUsername();
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                return "Email already exists: " + user.getEmail();
            }
            userRepository.save(user);
        }
        return "Users signed up successfully";
    }

    public Optional<User> login(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }

        return Optional.empty();
    }
}