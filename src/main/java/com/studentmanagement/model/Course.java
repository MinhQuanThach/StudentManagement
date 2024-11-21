package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @Column(name = "id_course")
    private String idCourse;

    @ManyToOne
    @JoinColumn(name = "id_teacher", nullable = false)
    private Teacher teacher;

    @Column(name = "credits", nullable = false)
    private Integer credits;

    @Column(name = "title", nullable = false, length = 100)
    private String title;
}
