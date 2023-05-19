import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../services/app.service';

describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('calculateNumberOfPayments', () => {
    it('should return the correct number of payments for accelerated bi-weekly schedule', () => {
      const paymentSchedule = 'accelerated-bi-weekly';
      const amortizationPeriod = 5;

      const result = appService.calculateNumberOfPayments(
        paymentSchedule,
        amortizationPeriod,
      );

      expect(result).toBe(130);
    });

    it('should return the correct number of payments for bi-weekly schedule', () => {
      const paymentSchedule = 'bi-weekly';
      const amortizationPeriod = 30;

      const result = appService.calculateNumberOfPayments(
        paymentSchedule,
        amortizationPeriod,
      );

      expect(result).toBe(780);
    });

    it('should return the correct number of payments for monthly schedule', () => {
      const paymentSchedule = 'monthly';
      const amortizationPeriod = 20;

      const result = appService.calculateNumberOfPayments(
        paymentSchedule,
        amortizationPeriod,
      );

      expect(result).toBe(240);
    });

    it('should return the loan term if an invalid payment schedule is provided', () => {
      const paymentSchedule = 'invalid';
      const amortizationPeriod = 10;

      const result = appService.calculateNumberOfPayments(
        paymentSchedule,
        amortizationPeriod,
      );

      expect(result).toBe(120);
    });
  });
});
