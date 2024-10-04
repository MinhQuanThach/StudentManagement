package com.studentmanagement.controller;

import com.studentmanagement.model.Student;
import com.studentmanagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller // For handling Thymeleaf templates
@RequestMapping("/students/view")
public class StudentViewController {
    @Autowired
    private StudentService studentService;

    // View all students in 'students' table to the website
    // Endpoint to render the students' list in Thymeleaf view
    @GetMapping
    public String viewStudents(Model model) {
        List<Student> students = studentService.getAllStudents();
        model.addAttribute("students", students);
        return "students";
    }
}
