package com.studentmanagement.repository;

import com.studentmanagement.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherTimetableRepository extends JpaRepository<Teacher, String> {
    @Query(value = "SELECT tch.id_teacher AS teacherId, tch.name AS teacherName, c.id_course AS courseId, c.title AS courseTitle, " +
            "t.day AS day, " + "t.start_time AS startTime, t.end_time AS endTime, t.room_number AS roomNumber " +
            "FROM teacher tch " +
            "JOIN courses c ON tch.id_teacher = c.id_teacher " +
            "JOIN time t ON c.id_course = t.id_course " +
            "WHERE tch.name = :teacherName", nativeQuery = true)
    List<Object[]> findTimetableByTeacherName(@Param("teacherName") String teacherName);
}

