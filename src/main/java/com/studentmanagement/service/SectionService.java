package com.studentmanagement.service;

import com.studentmanagement.model.Section;

import java.util.List;
import java.util.Optional;

public interface SectionService {

    List<Section> getAllSections();

    Optional<Section> getSectionById(String idSection);

    Section createSection(Section section);

    Section updateSection(String idSection, Section updatedSection);

    void deleteSection(String idSection);
}
