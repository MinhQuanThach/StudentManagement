package com.studentmanagement.service;

import com.studentmanagement.model.Faculty;

import java.util.List;
import java.util.Optional;

public interface FacultyService {
    List<Faculty> getAllFaculties();

    Optional<Faculty> getFacultyById(String idFaculty);

    Faculty createFaculty(Faculty faculty);

    Faculty updateFaculty(String idFaculty, Faculty updatedFaculty);

    void deleteFaculty(String idFaculty);
}
