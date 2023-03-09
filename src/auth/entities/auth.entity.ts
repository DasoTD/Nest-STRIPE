export class Auth {}
import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    // @Unique()
    username: string;

    // @Column()
    // firstname: string;

    // @Column()
    // lastname: string;

    // @Column({unique: true})
    // email: string;

    @Column()
    password: string;

    // @Column()
    // address: string;

    // @Column()
    // gender: string;

    // @Column()
    // profilePicture: string;

    // @Column({unique: true})
    // phoneNumber: string;

    // @Column()
    // lastLogin: Date;
}

