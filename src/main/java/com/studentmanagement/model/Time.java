package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@Entity
@Table(name = "time")
public class Time {
    // Getters and Setters
    @Id
    @Column(name = "id_time")
    private Integer idTime;

    @ManyToOne
    @JoinColumn(name = "id_course", nullable = false) // Maps the foreign key
    private Course course;

    @Column(name = "day", nullable = false)
    private LocalDate day;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "room_number")
    private String roomNumber;

}
