package com.studentmanagement.service;

import com.studentmanagement.model.Faculty;
import com.studentmanagement.model.Industry;
import com.studentmanagement.repository.IndustryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IndustryServiceImpl implements IndustryService {
    private final IndustryRepository industryRepository;

    @Autowired
    public IndustryServiceImpl(IndustryRepository industryRepository) {
        this.industryRepository = industryRepository;
    }

    @Override
    public List<Industry> getAllIndustries() {
        return industryRepository.findAll();
    }

    @Override
    public Optional<Industry> getIndustryById(String idIndustry) {
        return industryRepository.findById(idIndustry);
    }

    @Override
    public Industry createIndustry(Industry industry) {
        return industryRepository.save(industry);
    }

    @Override
    public Industry updateIndustry(String idIndustry, Industry updatedIndustry) {
        Optional<Industry> existingIndustry = industryRepository.findById(idIndustry);
        if (existingIndustry.isPresent()) {
            Industry industry = existingIndustry.get();
            industry.setIdFaculty(updatedIndustry.getIdFaculty());
            industry.setYearNumber(updatedIndustry.getYearNumber());
            industry.setTitle(updatedIndustry.getTitle());
            return industryRepository.save(industry);
        } else {
            throw new RuntimeException("Industry with ID " + idIndustry + " not found.");
        }
    }

    @Override
    public void deleteIndustry(String idIndustry) {
        industryRepository.deleteById(idIndustry);
    }
}
