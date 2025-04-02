# Kenya Tax Calculation Documentation

This document outlines the tax calculation formulas and logic used in the Kenya Tax & Billing Calculator application. It serves as a reference for understanding how tax calculations are implemented and for future maintenance.

## Income Tax Calculation

Kenya uses a progressive tax system with different tax bands. Here's how income tax is calculated:

### PAYE (Pay As You Earn) Tax Bands (2023-2024)

| Income Range (KES) | Rate (%) |
| ------------------ | -------- |
| Up to 24,000       | 10%      |
| 24,001 - 32,333    | 25%      |
| 32,334 - 500,000   | 30%      |
| 500,001 - 800,000  | 32.5%    |
| Above 800,000      | 35%      |

### Personal Relief

Every taxpayer is entitled to a personal relief of KES 2,400 per month (KES 28,800 per year).

### Insurance Relief

Tax relief on insurance premiums is calculated at 15% of the premiums paid, up to a maximum of KES 5,000 per month.

## NHIF (National Hospital Insurance Fund) Contributions

NHIF contributions are calculated based on the gross income:

| Gross Pay (KES)   | NHIF Contribution (KES) |
| ----------------- | ----------------------- |
| Up to 5,999       | 150                     |
| 6,000 - 7,999     | 300                     |
| 8,000 - 11,999    | 400                     |
| 12,000 - 14,999   | 500                     |
| 15,000 - 19,999   | 600                     |
| 20,000 - 24,999   | 750                     |
| 25,000 - 29,999   | 850                     |
| 30,000 - 34,999   | 900                     |
| 35,000 - 39,999   | 950                     |
| 40,000 - 44,999   | 1,000                   |
| 45,000 - 49,999   | 1,100                   |
| 50,000 - 59,999   | 1,200                   |
| 60,000 - 69,999   | 1,300                   |
| 70,000 - 79,999   | 1,400                   |
| 80,000 - 89,999   | 1,500                   |
| 90,000 - 99,999   | 1,600                   |
| 100,000 and above | 1,700                   |

## NSSF (National Social Security Fund) Contributions

NSSF contributions follow a tiered system:

### Tier I

- 6% of pensionable earnings up to KES 6,000
- Maximum Tier I contribution: KES 360 per month

### Tier II

- 6% of pensionable earnings between KES 6,001 and KES 18,000
- Maximum Tier II contribution: KES 720 per month

The total maximum NSSF contribution is KES 1,080 per month.

## Housing Levy

Housing levy is calculated at 1.5% of the gross salary.

## Tax Calculation Examples

### Example 1: Monthly Salary of KES 40,000

1. **Gross Pay**: KES 40,000

2. **NSSF Contribution**:

   - Tier I: 6% of KES 6,000 = KES 360
   - Tier II: 6% of KES 12,000 = KES 720
   - Total NSSF: KES 1,080

3. **Housing Levy**:

   - 1.5% of KES 40,000 = KES 600

4. **Taxable Income**:

   - Gross Pay - NSSF = KES 40,000 - KES 1,080 = KES 38,920

5. **PAYE Calculation**:

   - First KES 24,000 at 10% = KES 2,400
   - Next KES 8,333 at 25% = KES 2,083.25
   - Remaining KES 6,587 at 30% = KES 1,976.1
   - Total PAYE before relief = KES 6,459.35

6. **Personal Relief**:

   - KES 2,400 per month

7. **PAYE after Relief**:

   - KES 6,459.35 - KES 2,400 = KES 4,059.35

8. **NHIF Contribution**:

   - For salary of KES 40,000: KES 1,000

9. **Net Pay**:
   - Gross Pay - PAYE - NHIF - NSSF - Housing Levy
   - KES 40,000 - KES 4,059.35 - KES 1,000 - KES 1,080 - KES 600 = KES 33,260.65

## Implementation Notes

- All calculations are rounded to 2 decimal places
- The tax calculator handles edge cases such as:
  - Zero or negative income
  - Exceeding maximum limits for deductions
  - Changes in tax rates based on the selected year

## Recent Tax Changes

The application is updated to reflect the most recent tax changes from the Finance Acts. Key changes include:

- Introduction of the Housing Levy at 1.5% of gross pay
- Adjustments to the PAYE tax bands
- Changes to relief and deduction limits

## References

- Kenya Revenue Authority (KRA) guidelines
- Finance Act 2023
- NSSF Act
- NHIF Act

For any questions or clarifications regarding tax calculations, please refer to the official KRA website or consult a tax professional.
