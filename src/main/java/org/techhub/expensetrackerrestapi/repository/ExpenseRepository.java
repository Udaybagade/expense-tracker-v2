package org.techhub.expensetrackerrestapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.techhub.expensetrackerrestapi.entity.Expenses;
import org.techhub.expensetrackerrestapi.entity.User;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expenses, Integer> {
    List<Expenses> findByUser(User user);

    @Query("""
SELECT SUM(e.amount)
FROM Expense e
WHERE e.user = :user
""")
    Double getTotalExpense(User user);
}
