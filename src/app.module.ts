import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './api/auth/auth.module';
import { User } from './entities/user.entity';
import * as session from 'express-session';
import { ProductsModule } from './api/products/products.module';
import { Product } from './entities/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const configureTypeORM = (configService: ConfigService) => {
  return {
    type: 'sqlite',
    database: configService.get('DB_NAME'),
    entities: [User, Product],
    // TODO: set to false before going to production
    synchronize: true,
  } as TypeOrmModuleOptions;
};

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: configureTypeORM,
    }),
    AuthModule,
    ProductsModule,
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
      cookie: {
        httpOnly: false,
      },
    });

    consumer.apply(AppSession).forRoutes('*');
  }
}
