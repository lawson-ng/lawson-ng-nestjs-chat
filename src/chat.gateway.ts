import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, { cors: '*' })
export class ChatGateway implements OnGatewayConnection {
  handleConnection(client: any, ...args: any[]) {
    console.log('client connected:', client.id);
  }

  @SubscribeMessage('message')
  handleNewMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    throw new WsException('Invalid credentials.');
    console.log('🚀 ~ file: chat.gateway.ts:26 ~ ChatGateway ~ data:', data);
    return data;
  }

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }

  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }
}
