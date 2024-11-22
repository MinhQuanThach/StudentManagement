package com.studentmanagement.controller;


import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
