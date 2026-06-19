package org.techhub.expensetrackerrestapi.service;

import org.techhub.expensetrackerrestapi.dto.CategoryDto;
import org.techhub.expensetrackerrestapi.entity.Category;

import java.util.List;

public interface CategoryService {

    Category save(CategoryDto dto);
    List<Category> getAll();
    void delete(int id);
}
