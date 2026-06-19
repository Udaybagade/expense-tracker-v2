package org.techhub.expensetrackerrestapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.techhub.expensetrackerrestapi.entity.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer> {
}
