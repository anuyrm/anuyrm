package com.finance.repository;

import com.finance.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByDateBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = 'EXPENSE' AND t.date BETWEEN :start AND :end")
    BigDecimal getTotalExpenses(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = 'INCOME' AND t.date BETWEEN :start AND :end")
    BigDecimal getTotalIncome(LocalDateTime start, LocalDateTime end);
}
