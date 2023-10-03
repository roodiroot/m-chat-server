import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private rooms = [];

  addRoom(roomName: string, hostName: string) {
    return this.rooms.push({
      roomName,
      hostName,
    });
  }
  removeRoomByRoomName(roomName: string) {
    this.rooms = this.rooms.filter((room) => {
      room !== roomName;
    });
    return this.rooms;
  }

  removeRoomByIndex(index: number) {
    console.log(`элемент ${index} будет удален`);
    return this.rooms.splice(index, 1);
  }

  getRoomByUserId(userId: string) {
    const room = this.rooms.findIndex((i) => i.hostName === userId);
    if (room !== -1) {
      this.removeRoomByIndex(room);
    }
  }

  getRooms() {
    return {
      rooms: this.rooms,
      length: this.rooms.length,
    };
  }
}
