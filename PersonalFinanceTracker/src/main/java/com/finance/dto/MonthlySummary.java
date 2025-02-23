package com.finance.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class MonthlySummary {
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal balance;
}
