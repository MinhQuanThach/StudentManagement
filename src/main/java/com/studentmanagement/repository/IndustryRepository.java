package com.studentmanagement.repository;

import com.studentmanagement.model.Industry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IndustryRepository extends JpaRepository<Industry, String> {

    // Tìm theo ID ngành (idIndustry)
    @Query("SELECT i FROM Industry i WHERE LOWER(i.idIndustry) LIKE %:query%")
    List<Industry> findByIdIndustryContaining(@Param("query") String query);

    // Tìm theo tên ngành (title)
    @Query("SELECT i FROM Industry i WHERE LOWER(i.title) LIKE %:query%")
    List<Industry> findByTitleContaining(@Param("query") String query);

    // Tìm theo tên khoa (facultyName)
    // Cập nhật để truy vấn qua đối tượng faculty
    @Query("SELECT i FROM Industry i WHERE LOWER(i.faculty.title) LIKE %:query%")
    List<Industry> findByFacultyNameContaining(@Param("query") String query);
}
