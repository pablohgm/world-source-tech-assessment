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
      const loanTerm = 24;

      const result = appService.calculateNumberOfPayments(
        paymentSchedule,
        loanTerm,
      );

      expect(result).toBe(12);
    });

    it('should return the correct number of payments for bi-weekly schedule', () => {
      const paymentSchedule = 'bi-weekly';
      const loanTerm = 36;

      const result = appService.calculateNumberOfPayments(
        paymentSchedule,
        loanTerm,
      );

      expect(result).toBe(18);
    });

    it('should return the correct number of payments for monthly schedule', () => {
      const paymentSchedule = 'monthly';
      const loanTerm = 48;

      const result = appService.calculateNumberOfPayments(
        paymentSchedule,
        loanTerm,
      );

      expect(result).toBe(48);
    });

    it('should return the loan term if an invalid payment schedule is provided', () => {
      const paymentSchedule = 'invalid';
      const loanTerm = 60;

      const result = appService.calculateNumberOfPayments(
        paymentSchedule,
        loanTerm,
      );

      expect(result).toBe(60);
    });
  });
});
