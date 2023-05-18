import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { CalculateMortgageDto } from '../dto/calculate-mortgage.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mortgage/calculator')
  calculateMortgage(@Body() createMortgageDto: CalculateMortgageDto) {
    return this.appService.calculateMortgagePayment(createMortgageDto);
  }
}
