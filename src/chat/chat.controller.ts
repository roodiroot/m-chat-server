import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':room')
  async getChatByRoomName(@Param('room') room: string) {
    return this.chatService.getChatByRoomName(room);
  }
}
