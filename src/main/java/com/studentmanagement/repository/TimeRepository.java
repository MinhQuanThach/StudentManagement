package com.studentmanagement.repository;

import com.studentmanagement.model.Time;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeRepository extends JpaRepository<Time, Integer> {
}
