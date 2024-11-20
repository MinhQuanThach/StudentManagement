package com.studentmanagement.service;

import com.studentmanagement.model.Student;
import com.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Optional<Student> getStudentById(Integer id) {
        return studentRepository.findById(id);
    }

    @Override
    public Optional<Student> getStudentByUsername(String username) {
        return studentRepository.findByUsername(username);
    }

    @Override
    public List<Student> searchStudents(String query) {
        return studentRepository.searchStudents(query);
    }

    @Override
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(Integer id, Student updatedStudent) {
        Optional<Student> existingStudent = studentRepository.findById(id);
        if (existingStudent.isPresent()) {
            Student student = existingStudent.get();
            student.setName(updatedStudent.getName());
            student.setBirthday(updatedStudent.getBirthday());
            student.setUsername(updatedStudent.getUsername());
            student.setPassword(updatedStudent.getPassword());
            student.setCredits(updatedStudent.getCredits());
            student.setIdClass(updatedStudent.getIdClass());
            return studentRepository.save(student);
        } else {
            throw new RuntimeException("Student with id " + id + " not found.");
        }
    }

    @Override
    public void deleteStudent(Integer id) {
        studentRepository.deleteById(id);
    }

    @Override
    public boolean validateStudent(String username, String password) {
        Optional<Student> student = studentRepository.findByUsername(username);
        return student.isPresent() && student.get().getPassword().equals(password);
    }
}
