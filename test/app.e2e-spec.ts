import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/mortgage/calculator (POST): Get a correct value', () => {
    const requestBody = {
      propertyPrice: 100000,
      downPayment: 5000,
      annualInterestRate: 5,
      amortizationPeriod: 25,
      paymentSchedule: 'monthly',
    };

    return request(app.getHttpServer())
      .post('/mortgage/calculator')
      .send(requestBody)
      .expect(201)
      .expect('577.57');
  });
});
