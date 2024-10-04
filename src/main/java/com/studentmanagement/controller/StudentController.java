package com.studentmanagement.controller;

import com.studentmanagement.model.Student;
import com.studentmanagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController // Marks this class as a RESTful controller
@RequestMapping("/students") // Base URL for this controller's endpoints
public class StudentController {
    @Autowired
    private StudentService studentService;

    // Show all students in the database
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Show a specific student
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Integer id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Add a new student to the database
    @PostMapping
    public void createStudent(@RequestBody Student student) {
        studentService.createStudent(student);
    }

    // Update a student provided by the id
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Integer id, @RequestBody Student student) {
        Optional<Student> existingStudent = studentService.getStudentById(id);
        if (existingStudent.isPresent()) {
            student.setId(id);
            studentService.updateStudent(student);
            return ResponseEntity.ok(student);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Delete a student provided by the id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Integer id) {
        if (studentService.getStudentById(id).isPresent()) {
            studentService.deleteStudent(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
