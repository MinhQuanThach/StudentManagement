package com.studentmanagement.repository;

import com.studentmanagement.model.Takes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TakesRepository extends JpaRepository<Takes, Integer> {
    @Query("SELECT t FROM Takes t WHERE CAST(t.idTake AS string) LIKE %:idTake%")
    List<Takes> findTakesByIdTakeContaining(@Param("idTake") String idTake);

    @Query("SELECT t FROM Takes t WHERE CAST(t.student.id AS string) LIKE %:idStudent%")
    List<Takes> findTakesByStudentIdContaining(@Param("idStudent") String idStudent);

    @Query("SELECT t FROM Takes t WHERE t.course.idCourse LIKE %:idCourse%")
    List<Takes> findTakesByCourseIdContaining(@Param("idCourse") String idCourse);

    @Query("SELECT t FROM Takes t WHERE CAST(t.status AS string) LIKE %:status%")
    List<Takes> findTakesByStatusContaining(@Param("status") String status);

    @Query("SELECT t FROM Takes t WHERE CAST(t.year AS string) LIKE %:year%")
    List<Takes> findTakesByYearContaining(@Param("year") String year);

    @Query("SELECT t FROM Takes t WHERE CAST(t.grade AS string) LIKE %:grade%")
    List<Takes> findTakesByGradeContaining(@Param("grade") String grade);

}
