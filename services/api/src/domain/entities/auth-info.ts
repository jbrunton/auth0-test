import { Room } from './room.entity';
import { User } from './user.entity';

export interface AuthInfo {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  nickname?: string;
  picture?: string;
  locale?: string;
  updated_at?: number | string;
  email?: string;
  email_verified?: boolean;
}

export type AuthorizeParams = {
  user: User;
  action: 'read' | 'write' | 'manage';
  message?: string;
} & (
  | {
      subjectType: 'Room';
      subject: Room;
    }
  | {
      subjectType: 'User';
      subject: User;
    }
);

export interface AuthService {
  authorize(params: AuthorizeParams): Promise<void>;
}
