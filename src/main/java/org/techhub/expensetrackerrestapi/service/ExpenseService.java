package org.techhub.expensetrackerrestapi.service;

import org.techhub.expensetrackerrestapi.dto.ExpenseDto;
import org.techhub.expensetrackerrestapi.entity.Expenses;

import java.util.List;

public interface ExpenseService {
    Expenses createExpense(
            ExpenseDto dto,
            String email);

    List<Expenses> getAllExpenses(String email);
    Expenses getExpenseById(int id);
    Expenses updateExpense(int id, ExpenseDto dto);
    void deleteExpense(int id);

    Double getTotalExpense(String email);
}
