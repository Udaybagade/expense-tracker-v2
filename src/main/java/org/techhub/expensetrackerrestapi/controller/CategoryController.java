package org.techhub.expensetrackerrestapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.techhub.expensetrackerrestapi.dto.CategoryDto;
import org.techhub.expensetrackerrestapi.entity.Category;
import org.techhub.expensetrackerrestapi.service.CategoryService;
import org.techhub.expensetrackerrestapi.service.ExpenseServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService service;

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody CategoryDto dto){
        return ResponseEntity.ok(service.save(dto));
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAll(){
        return ResponseEntity.ok(service.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable int id){
        service.delete(id);
        return ResponseEntity.ok("Category deleted Successfully");
    }
}
