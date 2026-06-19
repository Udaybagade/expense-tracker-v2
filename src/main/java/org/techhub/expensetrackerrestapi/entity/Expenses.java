package org.techhub.expensetrackerrestapi.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity(name="Expense")
@Table(name = "Expenses")
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Expenses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    private Double amount;

    private LocalDate expenseDate;

    private String description;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name ="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;
}
