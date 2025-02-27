import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private lastMessageId = 0;
  private messages: Message[] = [
    {
      id: ++this.lastMessageId,
      content: 'Hello world!',
      sender: 'NestJS',
      recipient: 'you',
      createdAt: new Date(),
      read: false,
    },
  ];

  create(createMessageDto: CreateMessageDto) {
    this.messages.push({
      id: ++this.lastMessageId,
      ...createMessageDto,
      createdAt: new Date(),
    });

    return this.messages[this.messages.length - 1];
  }

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    const recado = this.messages.find(message => message.id === id);

    if (!recado) {
      throw new NotFoundException('Message not found');
    }
    return recado;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = this.messages.find(message => message.id === id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    this.messages = this.messages.map(message =>
      message.id === id ? { ...message, ...updateMessageDto } : message,
    );

    return this.messages.find(message => message.id === id);
  }

  remove(id: number) {
    const message = this.messages.find(message => message.id === id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    this.messages = this.messages.filter(message => message.id !== id);
    return;
  }
}
