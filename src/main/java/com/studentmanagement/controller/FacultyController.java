package com.studentmanagement.controller;

import com.studentmanagement.model.Faculty;
import com.studentmanagement.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/faculties")
public class FacultyController {
    private final FacultyService facultyService;

    @Autowired
    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    // Retrieve all faculties
    @GetMapping
    public List<Faculty> getAllFaculties() {
        return facultyService.getAllFaculties();
    }

    // Retrieve a specific faculty by ID
    @GetMapping("/{id}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable String id) {
        return facultyService.getFacultyById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Add a new faculty
    @PostMapping
    public ResponseEntity<Faculty> createFaculty(@RequestBody Faculty faculty) {
        Faculty createdFaculty = facultyService.createFaculty(faculty);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFaculty);
    }

    // Update an existing faculty
    @PutMapping("/{id}")
    public ResponseEntity<Faculty> updateFaculty(@PathVariable String id, @RequestBody Faculty updatedFaculty) {
        Optional<Faculty> existingFaculty = facultyService.getFacultyById(id);
        if (existingFaculty.isPresent()) {
            updatedFaculty.setIdFaculty(id);
            Faculty savedFaculty = facultyService.updateFaculty(id, updatedFaculty);
            return ResponseEntity.ok(savedFaculty);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a faculty by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable String id) {
        if (facultyService.getFacultyById(id).isPresent()) {
            facultyService.deleteFaculty(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

