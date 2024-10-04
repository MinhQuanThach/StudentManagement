package com.studentmanagement.service;

import com.studentmanagement.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<Student> getAllStudents();
    Optional<Student> getStudentById(Integer id);
    void createStudent(Student student);
    void updateStudent(Student updatedStudent);
    void deleteStudent(Integer id);
}
