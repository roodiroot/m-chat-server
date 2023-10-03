import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { UsersModule } from 'src/users/users.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  providers: [EventGateway],
  imports: [UsersModule, ChatModule],
})
export class EventModule {}
