import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Req, Res, Query, UseGuards } from '@nestjs/common';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { DeleteUserDto } from 'src/user/dto/delete-user.dto';
import { FilterUserDto } from 'src/user/dto/filter-user.dto';

import { AdminUserService } from './admin-user.service';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/user/entities/user.entity';
import { Request, Response } from 'express';
import { GetUser } from 'src/auth/utils/get-user.decorator';


@Controller('dashboard/users')
@UseGuards(AuthGuard())
export class AdminUserController {

  constructor(private readonly userService: AdminUserService) { }

  @Post()
  async create(@Body() createUsedDto: CreateUserDto, @Req() req: Request, @Res() res: Response): Promise<Response> {

    let createduser = await this.userService.create(createUsedDto);
    return res.status(HttpStatus.OK).json(createduser);
  }

  @Get()
  async findAll(@Query() filterUserDto: FilterUserDto, @Res() res: Response, @GetUser() user: User): Promise<Response> {
    console.log(user);
    if (Object.keys(filterUserDto).length) {
      return res.status(HttpStatus.OK).json(await this.userService.findUserWithFilter(filterUserDto));
    }
    let users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request, @GetUser() user: User) {
    console.log(user);
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id/email')
  updateRole(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateEmail(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.remove(deleteUserDto);
  }
}
