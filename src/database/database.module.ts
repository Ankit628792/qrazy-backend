import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from '@common/config/database.config';
import { DataSource } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forFeature(databaseConfig)],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
                type: 'postgres',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.user'),
                password: configService.get('database.password'),
                database: configService.get('database.database'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                autoLoadEntities: true,
                ssl: true,
                migrations: [__dirname + '/../migrations/*{.ts,.js}'],
                // synchronize: true,
                migrationsRun: true
            }),
            dataSourceFactory: async (options) => {
                const logger = new Logger();
                try {
                    const dataSource = new DataSource(options)
                    await dataSource.initialize()
                    logger.verbose('Database connection established successfully');
                    return dataSource;

                } catch (error) {
                    logger.error('Failed to connect to the database:', error);
                }
            }
        })
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule { }
