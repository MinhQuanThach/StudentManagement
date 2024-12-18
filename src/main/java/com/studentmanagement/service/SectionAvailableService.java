package com.studentmanagement.service;

import com.studentmanagement.DTO.SectionAvailableDTO;
import com.studentmanagement.repository.SectionAvailableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SectionAvailableService {
    @Autowired
    private SectionAvailableRepository sectionAvailableRepository;

    public List<SectionAvailableDTO> getSectionsBySemesterAndYear(String semester, int year) {
        List<Object[]> results = sectionAvailableRepository.findSectionsBySemesterAndYear(semester, year);

        return results.stream()
                .map(row -> new SectionAvailableDTO(
                        (String) row[0],  // sectionId
                        (String) row[1], // courseTitle
                        (int) row[2],  // credits
                        (String) row[3], // teacherName
                        (String) row[4], // day
                        (Time) row[5], // startTime
                        (Time) row[6], // endTime
                        (String) row[7] // roomNumber
                ))
                .collect(Collectors.toList());
    }

    public List<SectionAvailableDTO> getSectionsByStudentId(int studentId, String semester, int year) {
        List<Object[]> results = sectionAvailableRepository.findSectionsByStudentId(studentId, semester, year);

        return results.stream()
                .map(row -> new SectionAvailableDTO(
                        (String) row[0],  // sectionId
                        (String) row[1], // courseTitle
                        (int) row[2],  // credits
                        (String) row[3], // teacherName
                        (String) row[4], // day
                        (Time) row[5], // startTime
                        (Time) row[6], // endTime
                        (String) row[7] // roomNumber
                ))
                .collect(Collectors.toList());
    }
}

