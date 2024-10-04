package com.studentmanagement.service;

import com.studentmanagement.model.Student;
import com.studentmanagement.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class StudentServiceTest {
    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentServiceImpl studentService;

    public StudentServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetStudentById() {
        Student mockStudent = new Student();
        mockStudent.setId(1);
        mockStudent.setName("Jerry");
        mockStudent.setStudentClass("K68CS3");
        mockStudent.setEmail("jerry@gmail.com");
        mockStudent.setPhoneNumber("1234567890");

        when(studentRepository.findById(1)).thenReturn(Optional.of(mockStudent));

        Student result = studentService.getStudentById(1).orElseThrow(() -> new EntityNotFoundException("Student not found"));
        assertEquals("Jerry", result.getName());
        verify(studentRepository, times(1)).findById(1);
    }
}
