package com.finance.service;

import com.finance.dto.MonthlySummary;
import com.finance.model.Budget;
import com.finance.model.Transaction;
import com.finance.repository.BudgetRepository;
import com.finance.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinanceService {
    private final TransactionRepository transactionRepository;
    private final BudgetRepository budgetRepository;

    public FinanceService(TransactionRepository transactionRepository, BudgetRepository budgetRepository) {
        this.transactionRepository = transactionRepository;
        this.budgetRepository = budgetRepository;
    }

    @Transactional
    public Transaction addTransaction(Transaction transaction) {
        transaction.setDate(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

    @Transactional
    public Budget createBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    public List<Transaction> getTransactionsForPeriod(LocalDateTime start, LocalDateTime end) {
        return transactionRepository.findByDateBetween(start, end);
    }

    public MonthlySummary getMonthlySummary(int year, int month) {
        LocalDateTime start = LocalDate.of(year, month, 1).atStartOfDay();
        LocalDateTime end = start.plusMonths(1).minusSeconds(1);

        BigDecimal totalIncome = transactionRepository.getTotalIncome(start, end) != null ? 
            transactionRepository.getTotalIncome(start, end) : BigDecimal.ZERO;
        BigDecimal totalExpenses = transactionRepository.getTotalExpenses(start, end) != null ? 
            transactionRepository.getTotalExpenses(start, end) : BigDecimal.ZERO;

        MonthlySummary summary = new MonthlySummary();
        summary.setTotalIncome(totalIncome);
        summary.setTotalExpenses(totalExpenses);
        summary.setBalance(totalIncome.subtract(totalExpenses));
        
        return summary;
    }
}
