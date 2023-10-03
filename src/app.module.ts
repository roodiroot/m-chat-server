import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [EventModule, UsersModule, PrismaModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
