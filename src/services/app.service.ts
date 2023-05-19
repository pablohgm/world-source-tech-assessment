import { Injectable } from '@nestjs/common';
import {
  CalculateMortgageDto,
  PaymentSchedule,
} from '../dto/calculate-mortgage.dto';

const INSURANCE_RATES = {
  '0.95': 0.04, // LTV <= 95%
  '0.90': 0.031, // LTV <= 90%
  '0.85': 0.028, // LTV <= 85%
  '0.80': 0.024, // LTV <= 80%
  '0.75': 0.017, // LTV <= 75%
  '0.70': 0.0075, // LTV <= 70%
  '0.65': 0.006, // LTV <= 65%
  '0.60': 0.005, // LTV <= 60%
};

@Injectable()
export class AppService {
  calculateCMHCInsurance(propertyPrice: number, downPayment: number) {
    if (downPayment >= propertyPrice * 0.2) {
      return 0;
    }

    return this.getRateCMHCInsurance(propertyPrice, downPayment);
  }
  calculateLoanAmount(propertyPrice: number, downPayment: number) {
    const cmhcInsurance = this.calculateCMHCInsurance(
      propertyPrice,
      downPayment,
    );

    return propertyPrice - downPayment + cmhcInsurance;
  }

  calculateNumberOfPayments(
    paymentSchedule: string,
    amortizationPeriod: number,
  ) {
    const monthly = amortizationPeriod * 12;

    const scheduleMappings = {
      'accelerated-bi-weekly': amortizationPeriod * 26,
      'bi-weekly': amortizationPeriod * 26,
      monthly,
    };

    return scheduleMappings[paymentSchedule] || monthly;
  }

  calculateInterestRate(paymentSchedule: string, annualInterestRate: number) {
    const scheduleMappings = {
      'accelerated-bi-weekly': annualInterestRate / (26 * 100),
      'bi-weekly': annualInterestRate / (26 * 100),
      monthly: annualInterestRate / (12 * 100),
    };

    return scheduleMappings[paymentSchedule];
  }

  calculateMortgagePayment(createMortgageDto: CalculateMortgageDto) {
    const {
      propertyPrice,
      downPayment,
      annualInterestRate,
      amortizationPeriod,
      paymentSchedule,
    } = createMortgageDto;

    const loanAmount = this.calculateLoanAmount(propertyPrice, downPayment);

    const interestRate = this.calculateInterestRate(
      paymentSchedule,
      annualInterestRate,
    );

    const numberOfPayments = this.calculateNumberOfPayments(
      paymentSchedule,
      amortizationPeriod,
    );

    // Calculate the numerator value [P * i * (1 + i)^n]
    const numerator =
      loanAmount * interestRate * Math.pow(1 + interestRate, numberOfPayments);
    // Calculate the denominator value [(1 + i)^n - 1]
    const denominator = Math.pow(1 + interestRate, numberOfPayments) - 1;
    // Calculate the mortgage payment (M)
    const mortgagePayment = numerator / denominator;

    if (paymentSchedule === PaymentSchedule.acceleratedBiWeekly) {
      const additionalPrincipal = mortgagePayment / 12;
      const acceleratedBiWeekly = mortgagePayment + additionalPrincipal;

      return acceleratedBiWeekly.toFixed(2);
    }

    return mortgagePayment.toFixed(2);
  }

  getRateCMHCInsurance(principal, downPayment) {
    // Calculate the loan-to-value (LTV) ratio
    const loanToValue = (principal - downPayment) / principal;

    // Find the applicable insurance rate based on the LTV ratio
    const applicableRate = Object.keys(INSURANCE_RATES)
      .sort((a, b) => Number(b) - Number(a))
      .find((rate) => loanToValue >= parseFloat(rate));

    // Calculate the insurance premium
    const insurancePremium =
      (principal - downPayment) * INSURANCE_RATES[applicableRate];

    return insurancePremium;
  }
}
