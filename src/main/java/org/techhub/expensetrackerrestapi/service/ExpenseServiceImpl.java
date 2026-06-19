package org.techhub.expensetrackerrestapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.techhub.expensetrackerrestapi.dto.ExpenseDto;
import org.techhub.expensetrackerrestapi.entity.Category;
import org.techhub.expensetrackerrestapi.entity.Expenses;
import org.techhub.expensetrackerrestapi.entity.User;
import org.techhub.expensetrackerrestapi.exception.ResourceNotFoundException;
import org.techhub.expensetrackerrestapi.repository.CategoryRepository;
import org.techhub.expensetrackerrestapi.repository.ExpenseRepository;
import org.techhub.expensetrackerrestapi.repository.UserRepository;

import java.util.List;

@Service

public class ExpenseServiceImpl implements ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Expenses createExpense(ExpenseDto dto,
                                  String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Category category =
                categoryRepository
                        .findById(dto.getCategoryId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found"));

        Expenses expense =
                Expenses.builder()
                        .title(dto.getTitle())
                        .amount(dto.getAmount())
                        .expenseDate(dto.getExpenseDate())
                        .description(dto.getDescription())
                        .category(category)
                        .user(user)
                        .build();

        return expenseRepository.save(expense);
    }

    @Override
    public List<Expenses> getAllExpenses(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        return expenseRepository
                .findByUser(user);
    }

    @Override
    public Expenses getExpenseById(int id) {

        return expenseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found"));
    }

    @Override
    public Expenses updateExpense(int id, ExpenseDto dto) {

        Expenses expense = getExpenseById(id);

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Category not found"));

        expense.setTitle(dto.getTitle());
        expense.setAmount(dto.getAmount());
        expense.setExpenseDate(dto.getExpenseDate());
        expense.setDescription(dto.getDescription());
        expense.setCategory(category);

        return expenseRepository.save(expense);
    }

    @Override
    public void deleteExpense(int id) {

        Expenses expense = getExpenseById(id);

        expenseRepository.delete(expense);
    }

    @Override
    public Double getTotalExpense(String email) {
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        return expenseRepository.getTotalExpense(user);
    }

    private User getCurrentUser() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));
    }



}