package com.studentmanagement.repository;

import com.studentmanagement.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionAvailableRepository extends JpaRepository<Section, Integer> {
    @Query(value = "SELECT st.id_section AS sectionId, " +
            "c.title AS courseTitle, c.credits AS credits, " +
            "tch.name AS teacherName, " +
            "t.day AS day, t.start_time AS startTime, t.end_time AS endTime, t.room_number AS roomNumber " +
            "FROM section st " +
            "JOIN courses c ON st.id_course = c.id_course " +
            "JOIN time t ON st.id_section = t.id_section " +
            "JOIN teaches ts ON ts.id_section = st.id_section " +
            "JOIN teacher tch ON tch.id_teacher = ts.id_teacher " +
            "WHERE st.semester = :semester AND st.year = :year", nativeQuery = true)
    List<Object[]> findSectionsBySemesterAndYear(@Param("semester") String semester, @Param("year") int year);
}
