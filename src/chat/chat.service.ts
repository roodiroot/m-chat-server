import { Injectable } from '@nestjs/common';
import { MessageBodyDto } from 'src/event/dto/create-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}

  async createChat(data: MessageBodyDto) {
    const chat = await this.prismaService.chat.create({
      data: {
        author: data.author,
        text: data.text,
        roomName: data.roomName,
      },
    });
    return chat;
  }

  async getChatByRoomName(roomName: string) {
    const chat = await this.prismaService.chat.findMany({
      where: {
        roomName,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return chat;
  }
}
