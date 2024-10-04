package com.studentmanagement.controller;

import com.studentmanagement.model.Student;
import com.studentmanagement.service.StudentService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(StudentController.class)
class StudentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentService studentService;

    @Test
    void testGetStudentById() throws Exception {
        Student mockStudent = new Student();
        mockStudent.setId(1);
        mockStudent.setName("Jerry");
        mockStudent.setStudentClass("K68CS3");
        mockStudent.setPhoneNumber("1234567890");
        mockStudent.setEmail("jerry@gmail.com");

        Mockito.when(studentService.getStudentById(1)).thenReturn(Optional.of(mockStudent));

        mockMvc.perform(get("/students/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"id\":1,\"name\":\"Jerry\",\"studentClass\":\"K68CS3\",\"phoneNumber\":\"1234567890\",\"email\":\"jerry@gmail.com\"}"));
    }
}
