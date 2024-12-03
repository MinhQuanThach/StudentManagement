package com.studentmanagement.service;

import com.studentmanagement.model.Takes;
import com.studentmanagement.repository.TakesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TakesServiceImpl implements TakesService {
    private final TakesRepository takesRepository;

    @Autowired
    public TakesServiceImpl(TakesRepository takesRepository) {
        this.takesRepository = takesRepository;
    }

    @Override
    public List<Takes> getAllTakes() {
        return takesRepository.findAll();
    }

    @Override
    public Optional<Takes> getTakesById(Integer idTakes) {
        return takesRepository.findById(idTakes);
    }

    @Override
    public List<Takes> findTakesByIdTake(String idTake) {
        return takesRepository.findTakesByIdTakeContaining(idTake);
    }

    @Override
    public List<Takes> findTakesByStudentId(String idStudent) {
        return takesRepository.findTakesByStudentIdContaining(idStudent);
    }

    @Override
    public List<Takes> findTakesByCourseId(String idCourse) {
        return takesRepository.findTakesByCourseIdContaining(idCourse);
    }

    @Override
    public List<Takes> findTakesByStatus(String status) {
        return takesRepository.findTakesByStatusContaining(status);
    }

    @Override
    public List<Takes> findTakesByYear(String year) {
        return takesRepository.findTakesByYearContaining(year);
    }

    @Override
    public List<Takes> findTakesByGrade(String grade) {
        return takesRepository.findTakesByGradeContaining(grade);
    }

    @Override
    public Takes createTakes(Takes takes) {
        return takesRepository.save(takes);
    }

    @Override
    public Takes updateTakes(Integer idTakes, Takes updatedTakes) {
        Optional<Takes> existingTakes = takesRepository.findById(idTakes);
        if (existingTakes.isPresent()) {
            Takes takes = existingTakes.get();
            takes.setStudent(updatedTakes.getStudent());
            takes.setCourse(updatedTakes.getCourse());
            takes.setStatus(updatedTakes.getStatus());
            takes.setYear(updatedTakes.getYear());
            takes.setGrade(updatedTakes.getGrade());
            return takesRepository.save(takes);
        } else {
            throw new RuntimeException("Takes record not found with ID: " + idTakes);
        }
    }

    @Override
    public void deleteTakes(Integer idTakes) {
        if (takesRepository.existsById(idTakes)) {
            takesRepository.deleteById(idTakes);
        } else {
            throw new RuntimeException("Takes record not found with ID: " + idTakes);
        }
    }
}