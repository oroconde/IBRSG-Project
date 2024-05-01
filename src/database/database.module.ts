import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(
            {
                "name": "default",
                "type": "mysql",
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                "synchronize": false,
                "entities": []
            }
        ),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
