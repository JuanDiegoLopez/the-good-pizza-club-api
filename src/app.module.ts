import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as session from 'express-session';
import { join } from 'path';
import { AuthModule } from './api/auth/auth.module';
import { ProductsModule } from './api/products/products.module';
import { PromotionsModule } from './api/promotions/promotions.module';
import { RecordsModule } from './api/records/records.module';
import { UsersModule } from './api/users/users.module';
import { Address } from './entities/address.entity';
import { Payment } from './entities/payment.entity';
import { Product } from './entities/product.entity';
import { Promotion } from './entities/promotion.entity';
import { Record } from './entities/record.entity';
import { User } from './entities/user.entity';

const configureTypeORM = (configService: ConfigService) => {
  return {
    type: 'sqlite',
    database: configService.get('DB_NAME'),
    entities: [User, Product, Promotion, Record, Address, Payment],
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
    PromotionsModule,
    RecordsModule,
    UsersModule,
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
