import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const configureTypeORM = (configService: ConfigService) => {
  return {
    type: 'sqlite',
    database: configService.get('DB_NAME'),
    entities: [],
    // TODO: set to false before going to production
    synchronize: true,
  } as TypeOrmModuleOptions;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: configureTypeORM,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
