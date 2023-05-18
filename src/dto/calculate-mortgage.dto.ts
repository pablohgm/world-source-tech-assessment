import { IsEnum, IsNumber, Max, Min } from 'class-validator';

enum PaymentSchedule {
  acceleratedBiWeekly = 'accelerated-bi-weekly',
  biWeekly = 'bi-weekly',
  monthly = 'monthly',
}

export class CalculateMortgageDto {
  @IsNumber()
  @Max(100_000_000)
  propertyPrice: number;

  @IsNumber()
  @Max(100_000_000)
  downPayment: number;

  @IsNumber()
  annualInterestRate: number;

  @IsNumber()
  @Min(5)
  @Max(30)
  amortizationPeriod: number;

  @IsEnum(PaymentSchedule)
  paymentSchedule: string;
}
