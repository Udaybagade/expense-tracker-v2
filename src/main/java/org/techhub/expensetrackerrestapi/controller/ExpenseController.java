package org.techhub.expensetrackerrestapi.controller;
import java.security.Principal;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.techhub.expensetrackerrestapi.dto.ExpenseDto;
import org.techhub.expensetrackerrestapi.entity.Expenses;
import org.techhub.expensetrackerrestapi.service.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    @Autowired
    public ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<Expenses> createExpense(@Valid @RequestBody ExpenseDto dto,
                                                  Principal principal){
        return ResponseEntity.ok(
                expenseService.createExpense(
                        dto,
                        principal.getName()
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<Expenses>> getAllExpenses(Principal principal){
        return ResponseEntity.ok(expenseService.getAllExpenses(principal.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expenses> getExpense(@PathVariable int id){
        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expenses> updateExpense(@PathVariable int id, @RequestBody ExpenseDto dto){
        return ResponseEntity.ok(expenseService.updateExpense(id,dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable int id){
        expenseService.deleteExpense(id);
        return ResponseEntity.ok("Expenses Deleted Successfully");
    }

    @GetMapping("/total")
    public ResponseEntity<Double> getTotalExpense(Principal principal){
        return ResponseEntity.ok(expenseService.getTotalExpense(principal.getName()));
    }

}
