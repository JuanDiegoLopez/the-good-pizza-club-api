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

/**
 * Configures TypeORM database connection settings.
 * Sets up SQLite database with all entity classes and synchronization enabled for development.
 * 
 * @param {ConfigService} configService - The NestJS configuration service for accessing environment variables
 * @returns {TypeOrmModuleOptions} The TypeORM configuration object
 */
const configureTypeORM = (configService: ConfigService) => {
  return {
    /** Database type - using SQLite for this application */
    type: 'sqlite',
    /** Database file name from environment variables */
    database: configService.get('DB_NAME'),
    /** Array of entity classes to be registered with TypeORM */
    entities: [User, Product, Promotion, Record, Address, Payment],
    /** 
     * Automatically synchronize database schema with entities.
     * TODO: set to false before going to production 
     */
    synchronize: true,
  } as TypeOrmModuleOptions;
};

/**
 * Main application module that configures all features and dependencies.
 * Sets up database connection, static file serving, validation, session management,
 * and registers all feature modules (Auth, Products, Promotions, Records, Users).
 * 
 * @class AppModule
 */
@Module({
  imports: [
    /**
     * Serves static files from the public directory.
     * Used for serving pizza images and promotional content.
     */
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    /**
     * Global configuration module for environment variables.
     * Loads environment-specific .env files based on NODE_ENV.
     */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    /**
     * TypeORM database module with async configuration.
     * Uses the configureTypeORM factory function to set up database connection.
     */
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: configureTypeORM,
    }),
    /** Authentication module - handles user registration, login, and session management */
    AuthModule,
    /** Products module - manages pizza products and menu items */
    ProductsModule,
    /** Promotions module - handles special offers and discounts */
    PromotionsModule,
    /** Records module - manages pizza sizes, toppings, and other customization options */
    RecordsModule,
    /** Users module - handles user profile management and administration */
    UsersModule,
  ],
  controllers: [],
  providers: [
    /**
     * Global validation pipe that automatically validates all incoming requests
     * against their corresponding DTO classes using class-validator decorators.
     */
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  /**
   * Creates an instance of AppModule.
   * 
   * @param {ConfigService} configService - Injected configuration service for accessing environment variables
   */
  constructor(private configService: ConfigService) {}

  /**
   * Configures middleware for the application.
   * Sets up express-session middleware for session-based authentication
   * with secure cookie configuration.
   * 
   * @param {MiddlewareConsumer} consumer - NestJS middleware consumer for applying middleware to routes
   */
  configure(consumer: MiddlewareConsumer) {
    /** 
     * Express session configuration with secure settings.
     * Uses environment variable for session secret and applies to all routes.
     */
    const AppSession = session({
      /** Secret key for signing session cookies from environment variables */
      secret: this.configService.get('COOKIE_SECRET'),
      /** Prevents session from being saved back to session store if unmodified */
      resave: false,
      /** Prevents uninitialized sessions from being saved to the store */
      saveUninitialized: false,
      cookie: {
        /** 
         * Allows client-side JavaScript access to cookies.
         * Set to false for enhanced security in production.
         */
        httpOnly: false,
      },
    });

    /** Apply session middleware to all routes */
    consumer.apply(AppSession).forRoutes('*');
  }
}
