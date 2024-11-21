package com.studentmanagement.service;

import com.studentmanagement.model.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    List<Course> getAllCourses();
    Optional<Course> getCourseById(String idCourse);
    Course createCourse(Course course);
    Course updateCourse(String idCourse, Course updatedCourse);
    void deleteCourse(String idCourse);
}