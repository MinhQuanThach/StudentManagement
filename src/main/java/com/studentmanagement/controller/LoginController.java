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

    @Autowired
    private StudentService studentService;

    @PostMapping
    public String login(@RequestParam String username, @RequestParam String password) {
        if (studentService.validateStudent(username, password)) {
            return "Login successful";
        } else {
            return "Invalid username or password";
        }
    }

    @PostMapping("/login")
    public String handleLogin(@RequestParam String username, @RequestParam String password, Model model) {
        Optional<Student> studentOpt = studentService.getStudentByUsername(username);

        if (studentOpt.isPresent() && studentOpt.get().getPassword().equals(password)) {
            model.addAttribute("students", studentService.getAllStudents());
            return "students";
        } else {
            return "login";
        }
    }
}
