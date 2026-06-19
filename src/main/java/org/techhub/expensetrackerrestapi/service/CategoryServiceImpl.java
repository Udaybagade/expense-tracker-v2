package org.techhub.expensetrackerrestapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.expensetrackerrestapi.dto.CategoryDto;
import org.techhub.expensetrackerrestapi.entity.Category;
import org.techhub.expensetrackerrestapi.repository.CategoryRepository;

import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category save(CategoryDto dto) {
        Category category= Category.builder()
                .name(dto.getName()).build();
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public void delete(int id) {
        Category category= categoryRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Resource is not exist"));
        categoryRepository.delete(category);
    }
}
