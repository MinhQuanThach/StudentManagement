package com.studentmanagement.service;

import com.studentmanagement.model.Takes;

import java.util.List;
import java.util.Optional;

public interface TakesService {
    List<Takes> getAllTakes();

    Optional<Takes> getTakesById(Integer idTakes);

    List<Takes> findTakesByIdTake(String idTake);

    List<Takes> findTakesByStudentId(String idStudent);

    List<Takes> findTakesByCourseId(String idCourse);

    List<Takes> findTakesByStatus(String status);

    List<Takes> findTakesByYear(String year);

    List<Takes> findTakesByGrade(String grade);

    Takes createTakes(Takes takes);

    Takes updateTakes(Integer idTakes, Takes updatedTakes);

    void deleteTakes(Integer idTakes);
}