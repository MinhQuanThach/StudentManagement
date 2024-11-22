package com.studentmanagement.service;

import com.studentmanagement.model.Time;
import com.studentmanagement.repository.TimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TimeServiceImpl implements TimeService {
    private final TimeRepository timeRepository;

    @Autowired
    public TimeServiceImpl(TimeRepository timeRepository) {
        this.timeRepository = timeRepository;
    }

    @Override
    public List<Time> getAllTimes() {
        return timeRepository.findAll();
    }

    @Override
    public Optional<Time> getTimeById(Integer idTime) {
        return timeRepository.findById(idTime);
    }

    @Override
    public Time createTime(Time time) {
        return timeRepository.save(time);
    }

    @Override
    public Time updateTime(Integer idTime, Time updatedTime) {
        Optional<Time> existingTime = timeRepository.findById(idTime);
        if (existingTime.isPresent()) {
            Time time = existingTime.get();
            time.setCourse(updatedTime.getCourse());
            time.setDay(updatedTime.getDay());
            time.setStartTime(updatedTime.getStartTime());
            time.setEndTime(updatedTime.getEndTime());
            time.setRoomNumber(updatedTime.getRoomNumber());
            return timeRepository.save(time);
        } else {
            throw new RuntimeException("Time entry with ID " + idTime + " not found.");
        }
    }

    @Override
    public void deleteTime(Integer idTime) {
        if (timeRepository.existsById(idTime)) {
            timeRepository.deleteById(idTime);
        } else {
            throw new RuntimeException("Time entry with ID " + idTime + " not found.");
        }
    }
}