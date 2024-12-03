package com.studentmanagement.controller;

import com.studentmanagement.model.Student;
import com.studentmanagement.model.Takes;
import com.studentmanagement.service.TakesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/takes")
public class TakesController {
    private final TakesService takesService;

    @Autowired
    public TakesController(TakesService takesService) {
        this.takesService = takesService;
    }

    @GetMapping
    public List<Takes> getAllTakes() {
        return takesService.getAllTakes();
    }

    @GetMapping("/{idTakes}")
    public ResponseEntity<Takes> getTakesById(@PathVariable Integer idTakes) {
        return takesService.getTakesById(idTakes)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Takes>> searchTakesByQuery(
            @RequestParam String filter, @RequestParam String query) {
        List<Takes> takes;

        if (filter == null || query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        switch (filter.toLowerCase()) {
            case "idstudent":
                takes = takesService.findTakesByStudentId(query);
                break;
            case "idcourse":
                takes = takesService.findTakesByCourseId(query);
                break;
            case "status":
                takes = takesService.findTakesByStatus(query);
                break;
            case "year":
                takes = takesService.findTakesByYear(query);
                break;
            case "grade":
                takes = takesService.findTakesByGrade(query);
                break;
            default:
                return ResponseEntity.badRequest().body(null);
        }

        if (takes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(takes);
    }

    @PostMapping
    public ResponseEntity<Takes> createTakes(@RequestBody Takes takes) {
        Takes createdTakes = takesService.createTakes(takes);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTakes);
    }

    @PutMapping("/{idTakes}")
    public ResponseEntity<Takes> updateTakes(@PathVariable Integer idTakes, @RequestBody Takes updatedTakes) {
        Optional<Takes> existingTakes = takesService.getTakesById(idTakes);
        if (existingTakes.isPresent()) {
            updatedTakes.setIdTake(idTakes);
            Takes savedTakes = takesService.updateTakes(idTakes, updatedTakes);
            return ResponseEntity.ok(savedTakes);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{idTakes}")
    public ResponseEntity<Void> deleteTakes(@PathVariable Integer idTakes) {
        try {
            takesService.deleteTakes(idTakes);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}