package com.studentmanagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "takes")
public class Takes {
    @Id
    @Column(name = "id_takes")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTake;

    @ManyToOne
    @JoinColumn(name = "id", referencedColumnName = "id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "id_course", referencedColumnName = "id_course", nullable = false)
    private Course course;

    @Column(name = "status")
    private String status;

    @Column(name = "year")
    private Integer year;

    @Column(name = "grade")
    private Double grade;
}
