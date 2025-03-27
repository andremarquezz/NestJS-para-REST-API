import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly _repository: Repository<Message>,
  ) {}

  createAsync(createMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createMessageDto,
      createdAt: new Date(),
    };
    const message = this._repository.create(newMessage);
    return this._repository.save(message);
  }

  async findAllAsync() {
    return this._repository.find();
  }

  async findOneAsync(id: number) {
    const message = await this._repository.findOne({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async updateAsync(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const partialUpdateDto = {
      read: updateMessageDto?.read,
      content: updateMessageDto?.content,
    };

    const message = await this._repository.preload({
      id,
      ...partialUpdateDto,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return this._repository.save(message);
  }

  async removeAsync(id: number) {
    const message = await this._repository.findOneBy({ id });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return this._repository.remove(message);
  }
}
