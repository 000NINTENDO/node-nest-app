import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserInterface } from 'src/interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return {
      success: true,
      data: await this.usersService.getAllUsers(),
    };
  }

  @Post()
  createUser(@Body() usersData: UserInterface) {
    return this.usersService.createUser(usersData);
  }

  @Get(':userId')
  async getUser(@Param() params) {
    return this.usersService.getUserById(params.userId);
  }

  @Put()
  async udpateUserData(@Body() usersData: UserInterface) {
    return this.usersService.updateUserDetails(usersData);
  }

  @Delete(':userId')
  async deleteUser(@Param() params) {
    return this.usersService.deleteUser(params.userId);
  }
}
