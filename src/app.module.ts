import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigurationModule } from './config/config.module';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';
import { AtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AtStrategy } from './guards/strategy/at.strategy';
import { MongoModule } from './mongodb/mongo.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImagesModule } from './modules/images/images.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigurationModule,
    MongoModule,
    AuthModule,
    ImagesModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AtStrategy,
    RolesGuard,
  ],
})
export class AppModule {}
