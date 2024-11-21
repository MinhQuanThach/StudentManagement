package com.studentmanagement.repository;

import com.studentmanagement.model.Takes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TakesRepository extends JpaRepository<Takes, Integer> {
}
