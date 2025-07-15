import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstrap function that initializes and starts the NestJS application.
 * Configures the server with global prefix, CORS settings, and starts listening on the specified port.
 * 
 * @async
 * @function bootstrap
 * @returns {Promise<void>} Promise that resolves when the application starts successfully
 * @throws {Error} Throws error if application fails to start
 */
async function bootstrap() {
  /** @type {INestApplication} The NestJS application instance */
  const app = await NestFactory.create(AppModule);
  
  /**
   * Sets a global prefix for all routes in the application.
   * All API endpoints will be prefixed with '/api'
   */
  app.setGlobalPrefix('api');
  
  /**
   * Enables Cross-Origin Resource Sharing (CORS) with specific configuration.
   * Allows requests from localhost:3000 with credentials support for session handling.
   */
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  /**
   * Starts the HTTP server on the specified port.
   * Uses PORT environment variable or defaults to 3000
   */
  await app.listen(process.env.PORT || 3000);
}

/**
 * Start the application bootstrap process
 */
bootstrap();
