package com.studentmanagement.controller;

import com.studentmanagement.model.Teacher;
import com.studentmanagement.service.TeacherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{idTeacher}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Integer idTeacher) {
        return teacherService.getTeacherById(idTeacher)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher teacher) {
        Teacher createdTeacher = teacherService.createTeacher(teacher);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTeacher);
    }

    @PutMapping("/{idTeacher}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable Integer idTeacher, @RequestBody Teacher updatedTeacher) {
        try {
            updatedTeacher.setIdTeacher(idTeacher);
            Teacher savedTeacher = teacherService.updateTeacher(idTeacher, updatedTeacher);
            return ResponseEntity.ok(savedTeacher);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{idTeacher}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Integer idTeacher) {
        try {
            teacherService.deleteTeacher(idTeacher);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
