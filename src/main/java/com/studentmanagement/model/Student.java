package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "student")
public class Student {
    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "birthday", nullable = false)
    private String birthday;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "credits", nullable = false)
    private Integer credits;

    @Column(name = "id_class", nullable = false)
    private String idClass;

    @ManyToOne
    @JoinColumn(name = "id_industry") // Foreign key to industry table
    private Industry idIndustry;

}
