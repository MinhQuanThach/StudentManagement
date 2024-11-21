package com.studentmanagement.service;

import com.studentmanagement.model.Takes;

import java.util.List;
import java.util.Optional;

public interface TakesService {
    List<Takes> getAllTakes();
    Optional<Takes> getTakesById(Integer idTakes);
    Takes createTakes(Takes takes);
    Takes updateTakes(Integer idTakes, Takes updatedTakes);
    void deleteTakes(Integer idTakes);
}
