import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/users.entity'
import { Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }

    @Post()
    create(@Body() user: User) {
        return this.service.createUser(user);
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }

    @Put(':id')
    update(@Param('id') userId: number,@Body() user: User) {
        return this.service.updateUser(userId, user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }

}