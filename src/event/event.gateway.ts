import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { ChatService } from 'src/chat/chat.service';
import { MessageBodyDto } from './dto/create-chat.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  constructor(
    private userService: UsersService,
    private chatService: ChatService,
  ) {}

  _users = [];

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  async handleChatEvent(@MessageBody() data: MessageBodyDto) {
    await this.chatService.createChat(data);
    this.server.to(data.roomName).emit('chat', data);
    // console.log('НС', data);
  }

  @SubscribeMessage('join_room')
  async handleSetClientDataEvent(
    @MessageBody()
    data: any,
  ) {
    // console.log('Новый клиент:', data);
    if (data?.socketId && data?.roomName) {
      this.server.in(data.socketId).socketsJoin(data.roomName);
      this.userService.addRoom(data?.roomName, data.socketId);
    }
  }

  @SubscribeMessage('join_room_admin')
  async handleSetAdminDataEvent(
    @MessageBody()
    data: any,
  ) {
    const { rooms } = this.userService.getRooms();
    rooms.map((r) => {
      this.server.in(data.socketId).socketsLeave(r.roomName);
      // console.log(`администратор подключен ${data.socketId}`);
    });
    // console.log(`администратор подключен ${data.socketId}`);
    this.server.in(data.socketId).socketsJoin(data.roomName);
  }

  async handleConnection(socket: Socket): Promise<void> {
    this._users.push(socket.id);
    // console.log('подключены', this._users);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    this._users = this._users.filter((u) => u !== socket.id);
    this.userService.getRoomByUserId(socket.id);
    // console.log(`отключен ${socket.id}`);
    // console.dir(this._users);
  }
}
