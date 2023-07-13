import { CreateUserDto } from "../dto/create-user.dto";
import { DeleteUserDto } from "../dto/delete-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { FilterUserDto } from "../dto/filter-user.dto";

import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const { username, email, password, role } = createUserDto;

            const passwordSalt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, passwordSalt);

            const createdUser = this.userRepository.create({ username: username, email: email, password: hashedPassword, role })
            await this.userRepository.save(createdUser);
            return createdUser;
        } catch (err) {
            throw new ConflictException("user alaready exist");
        }
    }

    async deleteUser(deleteUserDto: DeleteUserDto) {
        const { id } = deleteUserDto;

        return await this.userRepository
            .createQueryBuilder('users')
            .softDelete()
            .where('id = :id', { id })
            .execute();
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {

        const { username, email, password, role } = updateUserDto;
        let user = await this.findOneBy(id);

        user.username = username;
        user.email = email;
        user.password = password;
        user.role = role;

        return await this.userRepository.save(user);

    }

    async findOneBy(id: string): Promise<User> {

        let foundedUser = await this.userRepository.findOneBy({ id })

        if (!foundedUser) {
            throw new NotFoundException(`user with id ${id} doesn't exist`)
        }

        return foundedUser;
    }

    getRepository(): Repository<User> {
        return this.userRepository;
    }

    async findUserByEmail(email: string): Promise<User> {
        let foundedUser = await this.userRepository.findOneBy({ email: email });

        if (!foundedUser) {
            throw new NotFoundException(`user with email ${email} doesn't exist`)
        }

        return foundedUser;

    }

    async findUsersByFilter(filterUserDto: FilterUserDto): Promise<User[]> {
        const { role, search } = filterUserDto;
        const query = this.userRepository.createQueryBuilder('users');

        // filter by role
        if (role) {
            query.andWhere(' users.role = :role', { role })
        }

        // search by firstName or lastName
        if (search) {
            console.log(search);
            query.andWhere(' users.username LIKE :search', { search: `%${search}%` })
        }
        return await query.getMany();
    }

    // update user email
    async updateUserEmail(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const { email } = updateUserDto;
        let user = await this.findOneBy(id);

        user.email = email;

        return await this.userRepository.save(user);
    }

}