import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Asignaciones } from 'src/shared/entities/Asignaciones';
import { Asistencia } from 'src/shared/entities/Asistencia';
import { Donaciones } from 'src/shared/entities/Donaciones';
import { Eventos } from 'src/shared/entities/Eventos';
import { Grupos } from 'src/shared/entities/Grupos';
import { Miembros } from 'src/shared/entities/Miembros.entity';
import { Roles } from 'src/shared/entities/Roles';
import { Sermones } from 'src/shared/entities/Sermones';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(
            {
                "name": "ibrsgDB",
                "type": "mysql",
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                "synchronize": false,
                "entities": [
                    Asignaciones,
                    Asistencia,
                    Donaciones,
                    Eventos,
                    Grupos,
                    Miembros,
                    Roles,
                    Sermones
                ]
            }
        ),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
