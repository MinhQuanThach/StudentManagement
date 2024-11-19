package com.studentmanagement.controller;

import com.studentmanagement.model.Industry;
import com.studentmanagement.service.IndustryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/industries")
public class IndustryController {
    private final IndustryService industryService;

    @Autowired
    public IndustryController(IndustryService industryService) {
        this.industryService = industryService;
    }

    // Retrieve all industries
    @GetMapping
    public List<Industry> getAllIndustries() {
        return industryService.getAllIndustries();
    }

    // Retrieve a specific industry by ID
    @GetMapping("/{id}")
    public ResponseEntity<Industry> getIndustryById(@PathVariable String id) {
        return industryService.getIndustryById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Add a new industry
    @PostMapping
    public ResponseEntity<Industry> createIndustry(@RequestBody Industry industry) {
        Industry createdIndustry = industryService.createIndustry(industry);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdIndustry);
    }

    // Update an existing industry
    @PutMapping("/{id}")
    public ResponseEntity<Industry> updateIndustry(@PathVariable String id, @RequestBody Industry updatedIndustry) {
        Optional<Industry> existingIndustry = industryService.getIndustryById(id);
        if (existingIndustry.isPresent()) {
            updatedIndustry.setIdIndustry(id);
            Industry savedIndustry = industryService.updateIndustry(id, updatedIndustry);
            return ResponseEntity.ok(savedIndustry);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete an industry by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIndustry(@PathVariable String id) {
        if (industryService.getIndustryById(id).isPresent()) {
            industryService.deleteIndustry(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

