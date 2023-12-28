import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    username:string;

    @Column({length:6 })
    password:string; 

    @Column('date') 
    birthday:Date;

    @Column() 
    isActive:boolean;
}