package com.studentmanagement.service;

import com.studentmanagement.model.Industry;

import java.util.List;
import java.util.Optional;

public interface IndustryService {
    List<Industry> getAllIndustries();

    Optional<Industry> getIndustryById(String idIndustry);

    Industry createIndustry(Industry industry);

    Industry updateIndustry(String idIndustry, Industry updatedIndustry);

    void deleteIndustry(String idIndustry);
}
