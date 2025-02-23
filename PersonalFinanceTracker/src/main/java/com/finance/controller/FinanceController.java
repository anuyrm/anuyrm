package com.finance.controller;

import com.finance.dto.MonthlySummary;
import com.finance.model.Budget;
import com.finance.model.Transaction;
import com.finance.service.FinanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/finance")
public class FinanceController {
    private final FinanceService financeService;

    public FinanceController(FinanceService financeService) {
        this.financeService = financeService;
    }

    @PostMapping("/transactions")
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction) {
        return ResponseEntity.ok(financeService.addTransaction(transaction));
    }

    @PostMapping("/budgets")
    public ResponseEntity<Budget> createBudget(@RequestBody Budget budget) {
        return ResponseEntity.ok(financeService.createBudget(budget));
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getTransactions(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        return ResponseEntity.ok(financeService.getTransactionsForPeriod(start, end));
    }

    @GetMapping("/summary/{year}/{month}")
    public ResponseEntity<MonthlySummary> getMonthlySummary(
            @PathVariable int year,
            @PathVariable int month) {
        return ResponseEntity.ok(financeService.getMonthlySummary(year, month));
    }
}
