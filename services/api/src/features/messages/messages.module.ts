import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { DataModule } from '@data/data.module';
import { UsersRepository } from './repositories/users.repository';
import { MessagesRepository } from './repositories/messages.repository';
import { DispatcherService } from './dispatcher.service';

@Module({
  imports: [DataModule],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    DispatcherService,
    UsersRepository,
    MessagesRepository,
  ],
  exports: [MessagesService],
})
export class MessagesModule {}
