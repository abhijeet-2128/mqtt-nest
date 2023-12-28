import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(user: User): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async createUser(user: User) {
        const newUser = this.usersRepository.create(user);
        return await this.usersRepository.save(newUser);
    }

    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ["username", "birthday", "isActive"],
            where: [{ "id": _id }]
        });
    }

    async updateUser(userId: number, updatedUser: User): Promise<User> {
        const existingUser: any = await this.usersRepository.findOne({
            where: [{ "id": userId }]
        });
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        // Update user properties
        existingUser.username = updatedUser.username;
        existingUser.isActive = updatedUser.isActive;

        return this.usersRepository.save(existingUser);
    }

    async deleteUser(user: User) {
        this.usersRepository.delete(user);
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: [{ "username": username }] });
    }

    async findById(id: number): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: [{ "id": id }] });
    }

    
  async updateIsActive(id: number, isActive: boolean): Promise<void> {
    await this.usersRepository.update(id, { isActive });
  }

}