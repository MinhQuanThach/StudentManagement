package com.studentmanagement.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalTime;

@Setter
@Getter
@Data
@AllArgsConstructor
public class StudentTimetableDTO {
    private Integer studentId;
    private String studentName;
    private String courseId;
    private String courseTitle;
    private String day;
    private Time startTime;
    private Time endTime;
    private String roomNumber;
}

