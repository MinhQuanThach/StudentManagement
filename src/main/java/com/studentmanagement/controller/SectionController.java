package com.studentmanagement.controller;

import com.studentmanagement.model.Section;
import com.studentmanagement.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/sections")
public class SectionController {
    private final SectionService sectionService;

    @Autowired
    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @GetMapping
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

    @GetMapping("/{idSection}")
    public ResponseEntity<Section> getSectionById(@PathVariable String idSection) {
        return sectionService.getSectionById(idSection)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Section> createSection(@RequestBody Section section) {
        Section createdSection = sectionService.createSection(section);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSection);
    }

    @PutMapping("/{idSection}")
    public ResponseEntity<Section> updateSection(@PathVariable String idSection, @RequestBody Section updatedSection) {
        try {
            updatedSection.setIdSection(idSection);
            Section savedSection = sectionService.updateSection(idSection, updatedSection);
            return ResponseEntity.ok(savedSection);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{idSection}")
    public ResponseEntity<Void> deleteSection(@PathVariable String idSection) {
        try {
            sectionService.deleteSection(idSection);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}