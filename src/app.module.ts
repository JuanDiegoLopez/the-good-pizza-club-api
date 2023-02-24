import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './api/auth/auth.module';
import { User } from './entities/user.entity';
import * as session from 'express-session';

const configureTypeORM = (configService: ConfigService) => {
  return {
    type: 'sqlite',
    database: configService.get('DB_NAME'),
    entities: [User],
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
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    const AppSession = session({
      secret: this.configService.get('COOKIE_SECRET'),
      resave: false,
      saveUninitialized: false,
    });

    consumer.apply(AppSession).forRoutes('*');
  }
}
