import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import {
  fakeAuthUser,
  FakeAuthGuard,
  resetFakeAuthUsers,
  FakeAuth,
} from '@fixtures/auth/FakeAuth';
import { map, omit } from 'rambda';
import { Message } from '@entities/message.entity';
import { MainModule } from '../src/main.module';
import { Room } from '@entities/room.entity';

jest.mock('@app/auth/auth0/auth0.client');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let fakeAuth1: FakeAuth;
  let fakeAuth2: FakeAuth;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MainModule],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useClass(FakeAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    jest.useFakeTimers();

    fakeAuth1 = fakeAuthUser();
    fakeAuth2 = fakeAuthUser();
  });

  afterEach(() => {
    resetFakeAuthUsers();
  });

  it('has a health check', async () => {
    await request(app.getHttpServer()).get('/').expect(200).expect('OK');
  });

  it('stores and retrieves messages', async () => {
    jest.setSystemTime(1001);

    const roomResponse = await request(app.getHttpServer())
      .post('/rooms')
      .set('Authorization', `Bearer ${fakeAuth1.accessToken}`)
      .send()
      .expect(201);

    const roomId = roomResponse.body.room.id;

    await request(app.getHttpServer())
      .post('/messages')
      .set('Authorization', `Bearer ${fakeAuth1.accessToken}`)
      .send({
        content: 'Hello Room 1, from User 1!',
        roomId,
      })
      .expect(201);

    const { body } = await request(app.getHttpServer())
      .get(`/messages/${roomId}`)
      .set('Authorization', `Bearer ${fakeAuth1.accessToken}`)
      .expect(200);

    const removeIds = (messages: Message[]) =>
      map((msg) => omit(['id'], msg), messages);

    expect(removeIds(body)).toEqual([
      {
        content: 'Hello Room 1, from User 1!',
        roomId,
        time: 1001,
        authorId: fakeAuth1.user.id,
      },
    ]);
  });
});
