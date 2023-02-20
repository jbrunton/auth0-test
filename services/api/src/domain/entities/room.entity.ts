export class Room {
  id: string;
  ownerId: string;
  name: string;
  contentPolicy: 'public' | 'private';
  joinPolicy: 'anyone' | 'request' | 'invite';
}
