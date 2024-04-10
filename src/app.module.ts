import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    // ChatModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
