package com.example.tunisiaairlinemanagementbackend.controller;

import com.example.tunisiaairlinemanagementbackend.Entity.User;
import com.example.tunisiaairlinemanagementbackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    // Explicit constructor-based dependency injection
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody List<User> users) {
        try {
            String result = userService.signupUsers(users);
            if (result.equals("Users signed up successfully")) {
                return ResponseEntity.ok(result);
            }
            return ResponseEntity.status(400).body(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error during signup");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            Optional<User> user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());
            }
            return ResponseEntity.status(401).body("Invalid username or password");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server error during login");
        }
    }
}