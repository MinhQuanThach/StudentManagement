package com.studentmanagement.service;

import java.util.Optional;
import com.studentmanagement.model.Industry;
import com.studentmanagement.repository.IndustryRepository;
import com.studentmanagement.service.IndustryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
            industry.setYearNumber(updatedIndustry.getYearNumber());
            industry.setTitle(updatedIndustry.getTitle());
            industry.setFaculty(updatedIndustry.getFaculty());
            return industryRepository.save(industry);
        } else {
            throw new RuntimeException("Industry with ID " + idIndustry + " not found.");
        }
    }

    @Override
    public void deleteIndustry(String idIndustry) {
        if (industryRepository.existsById(idIndustry)) {
            industryRepository.deleteById(idIndustry);
        } else {
            throw new RuntimeException("Industry with ID " + idIndustry + " not found.");
        }
    }

    @Override
    public List<Industry> filterIndustries(String filter, String query) {
        // Kiểm tra và gọi các phương thức tương ứng với bộ lọc
        switch (filter.toLowerCase()) {
            case "id":
                return industryRepository.findByIdIndustryContaining(query); // Tìm theo ID ngành
            case "name":
                return industryRepository.findByTitleContaining(query); // Tìm theo tên ngành
            case "faculty":
                return industryRepository.findByFacultyNameContaining(query); // Tìm theo tên khoa
            default:
                throw new IllegalArgumentException("Invalid filter criteria: " + filter); // Nếu filter không hợp lệ
        }
    }
}
