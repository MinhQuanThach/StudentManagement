package com.studentmanagement.repository;

import com.studentmanagement.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepository extends JpaRepository<Faculty, String> {
    // Additional custom queries can be defined here if needed
}
