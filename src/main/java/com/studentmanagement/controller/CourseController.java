package com.studentmanagement.controller;

import com.studentmanagement.model.Course;
import com.studentmanagement.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{idCourse}")
    public ResponseEntity<Course> getCourseById(@PathVariable String idCourse) {
        return courseService.getCourseById(idCourse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course createdCourse = courseService.createCourse(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
    }

    @PutMapping("/{idCourse}")
    public ResponseEntity<Course> updateCourse(@PathVariable String idCourse, @RequestBody Course updatedCourse) {
        try {
            updatedCourse.setIdCourse(idCourse);
            Course savedCourse = courseService.updateCourse(idCourse, updatedCourse);
            return ResponseEntity.ok(savedCourse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{idCourse}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String idCourse) {
        try {
            courseService.deleteCourse(idCourse);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
