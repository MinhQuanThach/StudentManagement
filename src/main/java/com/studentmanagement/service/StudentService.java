package com.studentmanagement.service;

import com.studentmanagement.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<Student> getAllStudents();

    Optional<Student> getStudentById(Integer id);

    Optional<Student> getStudentByUsername(String username);

    Student createStudent(Student student);

    Student updateStudent(Integer id, Student updatedStudent);

    void deleteStudent(Integer id);
}
