import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/users/entity/users.entity";

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '      ',
    database: 'Database1',
    synchronize: true,
    entities: [User]
}

export default typeOrmConfig;