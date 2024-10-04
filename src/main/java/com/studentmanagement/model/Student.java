package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "students")
public class Student {
    @Id
    @Column(name = "studentId")
    private Integer id;  // Primary key

    @Column(name = "studentName")
    private String name;

    @Column(name = "studentClass")
    private String studentClass;

    @Column(name = "studentPhone")
    private String phoneNumber;

    @Column(name = "studentEmail")
    private String email;
}
