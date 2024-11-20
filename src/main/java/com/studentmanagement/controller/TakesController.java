package com.studentmanagement.controller;

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

    @PostMapping
    public ResponseEntity<Takes> createTakes(@RequestBody Takes takes) {
        Takes createdTakes = takesService.createTakes(takes);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTakes);
    }

    @PutMapping("/{idTakes}")
    public ResponseEntity<Takes> updateTakes(@PathVariable Integer idTakes, @RequestBody Takes updatedTakes) {
        Optional<Takes> existingTakes = takesService.getTakesById(idTakes);
        if (existingTakes.isPresent()) {
            updatedTakes.setIdTakes(idTakes);
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
