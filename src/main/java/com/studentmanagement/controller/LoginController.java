package com.studentmanagement.controller;


import org.springframework.ui.Model; // Import Model
import org.springframework.beans.factory.annotation.Autowired; // Import Autowired
import com.studentmanagement.model.Student;
import com.studentmanagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @PostMapping
    public String login(@RequestParam String username, @RequestParam String password) {
        if (username.equals("admin") && password.equals("admin")) {
            return "Login successful";
        } else {
            return "Invalid username or password";
        }
    }

    @PostMapping("/login")
    public String handleLogin(@RequestParam String username, @RequestParam String password, Model model) {
        if (username.equals("admin") && password.equals("admin")) {
            model.addAttribute("username", username);
            return "admin";
        } else {
            return "login";
        }
    }
}
