import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from 'src/interfaces/user.interface';
import { User, UserDocument } from 'src/shemas/user.shema';

@Injectable()
export class UsersService {
  private readonly users: UserInterface[] = [];

  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async createUser(userData: UserInterface) {
    const user = await this.usersModel.find({ email: userData.email });
    if (user.length) return { message: 'User already exists!', success: false };
    const newUser = new this.usersModel(userData);
    await newUser.save();
    return {
      message: 'User registered successfully',
      success: true,
      data: newUser,
    };
  }

  async getAllUsers() {
    const users = await this.usersModel.find({});
    return users;
  }

  async findUserById(userId: string) {
    const user = await this.usersModel.findById(userId);
    if (!user)
      return {
        message: 'User not found',
        success: false,
      };
    return user;
  }

  async deleteUser(userId: string) {
    const user = await this.usersModel.findById(userId);
    if (!user)
      return {
        message: 'User not found',
        success: false,
      };
    await this.usersModel.findByIdAndDelete(userId);
    return {
      message: 'User deleted successfully',
      success: true,
    };
  }

  async getUserById(userId: string) {
    const user = await this.findUserById(userId);
    return { success: true, data: user };
  }

  async updateUserDetails(usersData: UserInterface) {
    const user = await this.usersModel.findById(usersData.id);
    if (!user)
      return {
        message: 'User not found',
        success: false,
      };

    const updatedUser = await this.usersModel.findByIdAndUpdate(
      usersData.id,
      usersData,
      { new: true },
    );

    return {
      message: 'Data updated successfully',
      success: true,
      data: updatedUser,
    };
  }
}
