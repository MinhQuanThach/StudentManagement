package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "industry")
public class Industry {
    @Id
    @Column(name = "id_industry", length = 15)
    private String idIndustry; // Primary Key

    @Column(name = "year_number", nullable = false)
    private Double yearNumber;

    @Column(name = "title", length = 50)
    private String title;

    @ManyToOne
    @JoinColumn(name = "id_faculty", nullable = false, insertable = false, updatable = false) // Foreign key in the 'industry' table
    private Faculty idFaculty;
}
