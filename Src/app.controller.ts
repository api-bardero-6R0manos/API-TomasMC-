import { Controller, Get, Headers } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(@Headers('x-api-key') apiKey: string): string {
    return `OK - Key: ${apiKey}`;
  }
}
