package com.studentmanagement.controller;

import com.studentmanagement.DTO.SectionAvailableDTO;
import com.studentmanagement.service.SectionAvailableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/section_available")
public class SectionAvailableController {
    @Autowired
    private SectionAvailableService sectionAvailableService;

    @GetMapping("/{semester}/{year}")
    public ResponseEntity<List<SectionAvailableDTO>> getSectionsBySemesterAndYear(@PathVariable String semester, @PathVariable int year) {
        List<SectionAvailableDTO> availableSections = sectionAvailableService.getSectionsBySemesterAndYear(semester, year);
        if (availableSections.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(availableSections);
    }
}
