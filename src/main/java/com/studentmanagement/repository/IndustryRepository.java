package com.studentmanagement.repository;

import com.studentmanagement.model.Industry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndustryRepository extends JpaRepository<Industry, String> {
}
