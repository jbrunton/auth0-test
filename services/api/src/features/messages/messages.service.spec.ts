import { Test, TestingModule } from '@nestjs/testing';
import { MessagesRepository } from './repositories/messages.repository';
import { UsersRepository } from './repositories/users.repository';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { TestUsersRepository } from '@fixtures/messages/test.users.repository';
import { TestMessagesRepository } from '@fixtures/messages/test.messages.repository';
import { User } from '@entities/user.entity';
import { UserFactory } from '@fixtures/messages/user.factory';
import { MessageFactory } from '@fixtures/messages/message.factory';

describe('MessagesService', () => {
  let service: MessagesService;
  let usersRepository: TestUsersRepository;
  let messagesRepository: TestMessagesRepository;

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime(1001);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        TestUsersRepository.Provider,
        TestMessagesRepository.Provider,
      ],
    }).compile();

    service = module.get(MessagesService);
    usersRepository = module.get(UsersRepository);
    messagesRepository = module.get(MessagesRepository);
  });

  describe('saveMessage', () => {
    it('stores the message', async () => {
      const roomId = 'Room#1';
      const message: CreateMessageDto = {
        content: 'Hello!',
      };
      const author = UserFactory.build();
      const response = await service.saveMessage(message, roomId, author);

      const expectedMessage = {
        id: 'Msg#1001',
        content: 'Hello!',
        roomId,
        authorId: author.id,
        time: 1001,
      };
      expect(response).toEqual(expectedMessage);
      expect(messagesRepository.getData()).toEqual([expectedMessage]);
      expect(usersRepository.getData()).toEqual([author]);
    });
  });

  describe('findForRoom', () => {
    it('returns the messages and their authors for the room', async () => {
      const roomId = 'Room#1';
      const author1 = UserFactory.build();
      const author2 = UserFactory.build();
      const msg1 = MessageFactory.build({
        authorId: author1.id,
        roomId,
      });
      const msg2 = MessageFactory.build({
        authorId: author2.id,
        roomId,
      });

      usersRepository.setData([author1, author2]);
      messagesRepository.setData([msg1, msg2]);

      const response = await service.findForRoom(roomId);

      expect(response).toEqual({
        messages: [msg1, msg2],
        authors: {
          [author1.id]: author1,
          [author2.id]: author2,
        },
      });
    });
  });
});
