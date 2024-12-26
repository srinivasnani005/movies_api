import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/users.schema';
import { hashPassword, encrypt, decrypt } from '../utils/crypto.utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hashPassword(createUserDto.password);
    const encryptedName = encrypt(createUserDto.name);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      name: encryptedName,
    });

    await createdUser.save();

    return { message: `User ${createUserDto.name} created successfully` };
  }

  async findAll(): Promise<{ count: number; users: User[] }> {
    const users = await this.userModel.find().exec();
    const decryptedUsers = users.map((user) => ({
      ...user.toObject(),
      name: decrypt(user.name),
    }));
    
    return {
      count: decryptedUsers.length,
      users: decryptedUsers,
    };
  }
  

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      ...user.toObject(),
      name: decrypt(user.name),
    };
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<{ message: string }> {
    const updatedData: any = { ...updateUserDto };

    if (updateUserDto.password) {
      updatedData.password = await hashPassword(updateUserDto.password);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updatedData, { new: true }).exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return { message: `User ${decrypt(updatedUser.name)} updated successfully` };
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }

    return { message: `User ${decrypt(deletedUser.name)} deleted successfully` };
  }

  async removeAll(): Promise<{ message: string }> {
    await this.userModel.deleteMany({}).exec();
    return { message: 'All users deleted successfully' };
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? user.toObject() : null;
  }
}
