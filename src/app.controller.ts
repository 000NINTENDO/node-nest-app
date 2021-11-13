import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { User } from './user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUser(@Body() user: User) {
    return `Recieved body is ${user}`;
  }

  @Get()
  getHello(@Req() request: Request) {
    console.log(request);
    // response.json('Response from express native api');
    // return this.appService.getHello();
  }

  @Get(':id')
  getUserById(@Param() params): string {
    return `User repsonse for id ${params.id} `;
  }

  @Get('*')
  globalRes() {
    return 'This is the global response';
  }
}
