import { Injectable } from '@nestjs/common';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { DeleteUserDto } from 'src/user/dto/delete-user.dto';
import { FilterUserDto } from 'src/user/dto/filter-user.dto';

import { UserRepository } from 'src/user/repositories/user.repository';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AdminUserService {
  constructor(
    private customUserRepository: UserRepository,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    return await this.customUserRepository.createUser(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findUserWithFilter(filterUserDto: FilterUserDto): Promise<User[]> {

    return this.customUserRepository.findUsersByFilter(filterUserDto);
  }

  async findOne(id: string): Promise<User> {
    return await this.customUserRepository.findOneBy(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.customUserRepository.findUserByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.customUserRepository.updateUser(id, updateUserDto)
  }

  updateEmail(id: string, updateUserDto: UpdateUserDto) {
    return this.customUserRepository.updateUserEmail(id, updateUserDto);
  }

  remove(deleteUserDto: DeleteUserDto) {

    return this.customUserRepository.deleteUser(deleteUserDto);
  }
}
