import { Room } from './room.entity';

export type CreateRoomParams = Omit<Room, 'id'>;
export type UpdateRoomParams = Partial<Pick<Room, 'name'>> & Pick<Room, 'id'>;

export abstract class RoomsRepository {
  abstract createRoom(params: CreateRoomParams): Promise<Room>;
  abstract getRoom(id: string): Promise<Room>;
  abstract updateRoom(params: UpdateRoomParams): Promise<Room>;
}
